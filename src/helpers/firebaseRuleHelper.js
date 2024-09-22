import rules from "./firebaseRuleMaker";

export default rules;

module.exports = {
  getSchemaKeysOf(obj) {
    return Object.keys(obj).filter(
      (key) => !key.startsWith("$") && !key.startsWith(".")
    );
  },
};
