import Technology from "../models/technology";

const model = Technology;
for (let assoc of Object.keys(model.associations)) {
    for (let accessor of Object.keys(model.associations[assoc].accessors)) {
        console.log(model.name + '.' + model.associations[assoc].accessors[accessor]+'()');
    }
}