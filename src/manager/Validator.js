/**
 * Created by dawizards on 16/9/21.
 */
var Validator = Object.create({
    isEmpty: function (target, alertText) {
        if (target == null || target == '') {
            alert(alertText);
            return true;
        }
        return false;
    }
});
export default Validator;