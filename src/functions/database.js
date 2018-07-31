function defaultData(data) {

	let obj = {
		PROJECT_LIST: [],
		PROJECTS: {},
		EVENTS: []
	}

	for (let key in data.events) {
		obj.EVENTS.push(data.events[key])
	}

	for (let key in data.projects) {
		obj.PROJECTS[key] = [];
		for (let value in data.projects[key]) {
			obj.PROJECTS[key].push(data.projects[key][value])
		}
	}

	for(let key in data.projectsList) {
		obj.PROJECT_LIST.push(data.projectsList[key])
	}

	return obj;
}

export { defaultData };