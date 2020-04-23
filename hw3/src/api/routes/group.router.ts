import {Request, Response, Router} from 'express';
import { createValidator } from 'express-joi-validation';
import { groupBodySchema } from '../../validations/group.validation';
import GroupService from "../../services/group.service";

const groupRouter = Router();
const validator = createValidator();

groupRouter
    .get('/:id', async (req: Request, res: Response) => {
        const {id} = req.params;
        const group = await GroupService.getGroupById(parseInt(id, 10));
        res.send(group)
    })
    .get('/', async (req: Request, res: Response) => {
        const groups = await GroupService.getAllGroups();
        res.send(groups);
    })
    .post('/', validator.body(groupBodySchema), async (req: Request, res: Response) => {
        const groupDTO = req.body;
        const groupRecord = await GroupService.createGroup(groupDTO);
        res.send(groupRecord);
    })
    .put('/', validator.body(groupBodySchema), async (req: Request, res: Response) => {
        const groupdDTO = req.body;
        const result = await GroupService.updateGroup(groupdDTO);
        res.send(result);
    })
    .delete('/id', async (req: Request, res: Response) => {
        const {id} = req.params;
        await GroupService.removeGroupById(parseInt(id, 10));
        res.send('All is good!');
    });

export default groupRouter;

