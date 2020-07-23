export const isPrimitive = (test) => {
	return test !== Object(test);
};

export const allPropertiesArePrimitive = (test) => {
	return Object.keys(test).every((key) => isPrimitive(test[key]));
};
