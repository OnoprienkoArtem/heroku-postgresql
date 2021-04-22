import express from 'express';
import { getAutoSuggestUsers, getUserById, createUser, updateUserById, removeUserById } from '../controllers/controllers';
import { schema } from '../validation/validationSchema';
import { validateSchema } from '../validation/validator';

const router = express.Router();

router.get('/', getAutoSuggestUsers);
router.get('/:id', getUserById);
router.post('/', validateSchema(schema), createUser);
router.put('/:id', validateSchema(schema), updateUserById);
router.delete('/:id', removeUserById);

export default router;
