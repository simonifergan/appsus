
import {eventBus, EMAILS_CHECKED_MODIFIED} from '../../../event-bus.js';

export default {
    props: [],
    template: ` 
        <section class="email-toolbar flex">
            <button title="Go back" class="toolbar-btn-border" @click="goBack">
                <i class="fas fa-arrow-left"></i>
            </button>
            <button title="Move to trash" class="toolbar-btn-border" @click="deleteEmails">
                <i class="fas fa-trash-alt"></i>
            </button>
            <button title="Mark as unread" class="toolbar-btn-border" @click="unreadEmails">
                <i class="fas fa-envelope"></i>
            </button>
            <button title="Mark as read" class="toolbar-btn-border" @click="readEmails">
                <i class="fas fa-envelope-open"></i>
            </button>
        </section>
    `,
    data() {
        return {
        }
    },
    methods: {
        goBack() {
            this.$router.go(-1);
        },
        deleteEmails() {
            eventBus.$emit(EMAILS_CHECKED_MODIFIED, 'delete');
        },
        unreadEmails() {
            eventBus.$emit(EMAILS_CHECKED_MODIFIED, 'unread');
        },
        readEmails() {
            eventBus.$emit(EMAILS_CHECKED_MODIFIED, 'read');
        }
    },
}