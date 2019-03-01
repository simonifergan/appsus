
import emailService from '../../email/services/email.service.js';

export default {
    props: ['username', 'body', 'draftEmail'],
    template: `
        <section class="email-compose">
            <header>
                <p>New message</p>
                <button @click="closeComposeEmail()">X</button>
            </header>
            <form @submit.prevent.stop="sendEmail()" class="flex">
                <input 
                    type="text" 
                    class="recipient-input" 
                    placeholder="To" 
                    v-model="email.recipient" required>
                <input type="text" class="subject-input" placeholder="Subject" v-model="email.subject">
                <textarea type="text" class="subject-input" v-model="email.body"></textarea>
                <button type="submit">Send</button>
            </form>
        </section>
    `,
    data() {
        return {
            email: {
                sender: this.username,
                recipient: null,
                subject: null,
                body: null,
            }
        };
    },
    methods: {
        sendEmail() {
            // debugger;
            // this.closeComposeEmail();
            this.$emit('email-sent');
            emailService.addEmail({...this.email})
                .then(console.log('success')
                );
            this.email = {
                sender: this.username,
                recipient: null,
                subject: null,
                body: null,
            };
        },
        closeComposeEmail() {
            this.$emit('closeComposeEmail', {...this.email});
        }
    },
    computed: {
    },
    mounted() {
        if (this.draftEmail && this.draftEmail.id) {
        this.email = {...this.draftEmail};
        } else {
            this.email.body = this.body;
        }
    }
}