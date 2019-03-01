import {eventBus, USER_MSG_SUCCESS, USER_MSG_FAILURE} from '../event-bus.js';

export default {
    template: `
        <aside class="global-user-msg flex" :class="setClass">
            <div class="message-container">
                {{msg}}
            </div>
            <button @click="isOn = false" class="btn btn-close-user-msg">
                <i class="fas fa-window-close"></i>
            </button>
        </aside>
    `,
    data() {
        return {
            msg: '',
            isOn: false,
            isSuccess: false,
        }
    },
    created() {
        eventBus.$on(USER_MSG_SUCCESS, successMsg => {
            // Set success msg
            this.isOn = true;
            this.msg = successMsg;
            this.isSuccess = true;
            setTimeout(() => this.isOn = false, 2200)
        });

        eventBus.$on(USER_MSG_FAILURE, failureMsg => {
            this.isOn = true;
            this.msg = failureMsg;
            this.isSuccess = false;
            setTimeout(() => this.isOn = false, 2200);
        });

        // // TESTING
        // setTimeout(() => {eventBus.$emit(USER_MSG_SUCCESS, 'HI')}, 2000);
        // setTimeout(() => {eventBus.$emit(USER_MSG_FAILURE, 'BYE')}, 7000);
    },
    computed: {
        setClass() {
            return {success: this.isSuccess, show: this.isOn};
        }
    },

}