class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        this.initial = config["initial"];
        this.state = config["initial"];
        this.states = config["states"];
        this.history = new Array();
        this.second_history = new Array();
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.state;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if (this.states[state] == undefined) throw new ErrorEvent("illegal state")
        this.history.push(this.state);
        this.state = state;
        this.second_history = new Array();
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        if (this.states[this.state]["transitions"][event] == undefined) throw new ErrorEvent("Illegal event");
        this.history.push(this.state);
        this.state = this.states[this.state]["transitions"][event];
        this.second_history = new Array();
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.state = this.initial;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        let arr = new Array();
        if (event == undefined) {
            for (let st in this.states) {
                arr.push(st);
            }
        }
        else {
            for (let st in this.states) {
                if (this.states[st]["transitions"][event] != undefined) arr.push(st);
            }
        }
        return arr;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (this.history.length == 0) {
            return false;
        } 
        else {
            this.second_history.push(this.state);
            this.state = this.history.pop();
            return true;
        }
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (this.second_history.length == 0) {
            return false; 
        } 
        else {
            this.history.push(this.state);
            this.state = this.second_history.pop();
            return true;
        }
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.second_history = new Array();
        this.history = new Array();
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
