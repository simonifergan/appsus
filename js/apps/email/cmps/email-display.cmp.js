import emailService from '../services/email.service.js';
import utilService from '../../../services/util.service.js';
import { eventBus, EMAIL_MODIFIED, UNREAD_EMAILS } from '../../../event-bus.js';

export default {
    template: `
        <section v-if="email" class="email-display">
            <div class="display-toolbar flex align-center">
                <router-link tag="button" class="email-to-note" :to="'/notes?content=' + email.body" >
                    <i class="fas fa-thumbtack"></i>
                </router-link>
            </div>
            <div class="display-content grid">
                <div class="sent-date"><span>Sent At: </span>{{formattedDate}}</div>
                <h1 class="subject">{{email.subject}}</h1>
                <h2 class="sent-from"><span>From: </span>{{email.sender}}</h2>
                <p class="email-body">{{email.body}}</p>
            </div>
        </section>
    `,
    data() {
        return {
            email: null,
        };
    },
    computed: {
        formattedDate() {
            return utilService.formatDate(this.email.sentAt);
        }
    },
    created() {
        let emailId = this.$route.params.emailId;
        emailService.getEmailById(emailId)
            .then(email => this.email = email);

        setTimeout(() => {
            this.email.isRead = true;
            eventBus.$emit(EMAIL_MODIFIED, { ...this.email });
            eventBus.$emit(UNREAD_EMAILS);
        }, 1000)
    },
}