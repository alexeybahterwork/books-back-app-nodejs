import {Router} from 'express';
import * as glob from 'glob'

const routes = glob.sync('**/*.js', { cwd: `${__dirname}/` })
    .map(filename => require(`./${filename}`))
    .filter(router => Object.getPrototypeOf(router) === Router)
    .reduce((rootRouter, router) => {return rootRouter.use(router)}, Router({ mergeParams: true }))

export default routes