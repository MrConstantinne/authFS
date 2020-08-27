import { calculateLimitAndOffset, paginate } from 'paginate-info';
import Files from '../models/file';

export const getFiles = async (req, res) => {

    try {

        const { query: { page, list_size } } = req;

        const { limit, offset } = calculateLimitAndOffset(page, list_size);
        const { rows, count } = await Files.findAndCountAll({ limit, offset});
        const meta = paginate(page, count, rows, list_size);
        return res.status(200).json({
            rows, meta
        })

    } catch (err) {
        res.status(500).json({
            message: `Ошибка сервера: ${ err }`
        });
    }
}

export const getFile = async (req, res) => {
    const { id } = req.params;
    try {

        const file = await Files.findOne({
            where: { id: id }
        });

        return res.status(200).json({
            data: file
        })

    } catch (err) {
        res.status(500).json({
            message: `Ошибка сервера: ${ err }`
        });
    }
}