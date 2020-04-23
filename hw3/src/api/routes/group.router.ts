import {Request, Response, Router} from 'express';
import { createValidator } from 'express-joi-validation';
import { groupBodySchema } from '../../validations/group.validation';
import GroupService from "../../services/group.service";
import bunyanLoggers from "../../loggers/bunyan.logger";
import middlewares from "../../middlewares/common.middleware";

const groupRouter = Router();
const validator = createValidator();

const {checkAuth} = middlewares;

groupRouter
    .get('/:id', checkAuth, async (req: Request, res: Response) => {
        const {id} = req.params;
        try {
            const group = await GroupService.getGroupById(parseInt(id, 10));
            res.send(group)
        } catch (e) {
            bunyanLoggers.serviceErrorsLogger
                .error(`Method: GroupService.getGroupById; Arguments: id=${id}; Error message: ${e.message};`);
            res.json({status: 400, message: e.message});
        }
    })
    .get('/', checkAuth, async (req: Request, res: Response) => {
        try {
            const groups = await GroupService.getAllGroups();
            res.send(groups);
        }
        catch (e) {
            bunyanLoggers.serviceErrorsLogger
                .error(`Method: GroupService.getAllGroups; Arguments: nothing; Error message: ${e.message};`);
            res.json({status: 400, message: e.message});
        }
    })
    .post('/', checkAuth, validator.body(groupBodySchema), async (req: Request, res: Response) => {
        const groupDTO = req.body;
        try {
            const groupRecord = await GroupService.createGroup(groupDTO);
            res.send(groupRecord);
        } catch (e) {
            bunyanLoggers.serviceErrorsLogger
                .error(`Method: GroupService.createGroup; Arguments: groupDTO=${groupDTO}; Error message: ${e.message};`);
            res.json({status: 400, message: e.message});
        }
    })
    .put('/', checkAuth, validator.body(groupBodySchema), async (req: Request, res: Response) => {
        const groupDTO = req.body;
        try {
            const result = await GroupService.updateGroup(groupDTO);
            res.send(result);
        } catch (e) {
            bunyanLoggers.serviceErrorsLogger
                .error(`Method: GroupService.updateGroup; Arguments: groupDTO=${groupDTO}; Error message: ${e.message};`);
            res.json({status: 400, message: e.message});
        }
    })
    .delete('/id', checkAuth, async (req: Request, res: Response) => {
        const {id} = req.params;
        try {
            await GroupService.removeGroupById(parseInt(id, 10));
            res.send('All is good!');
        } catch (e) {
            bunyanLoggers.serviceErrorsLogger
                .error(`Method: GroupService.removeGroupById; Arguments: id=${id}; Error message: ${e.message};`);
            res.json({status: 400, message: e.message});
        }
    });

export default groupRouter;
