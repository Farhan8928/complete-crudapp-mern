const Record = require('../models/recordModel');
const Category = require('../models/categoryModel');

exports.createRecord = async (req, res) => {
    const { name, description, category, active } = req.body;
    try {
        const existingCategory = await Category.findById(category);
        if (!existingCategory) {
            return res.status(400).json({ msg: 'Category does not exist' });
        }

        const newRecord = new Record({
            name,
            description,
            category,
            active,
            user: req.user.id,
        });

        const record = await newRecord.save();
        res.json(record);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getRecords = async (req, res) => {
    const { active, search } = req.query;
    try {
        let filter = { user: req.user.id };
        if (active) filter.active = active === 'true';
        if (search) filter.name = { $regex: search, $options: 'i' };

        const records = await Record.find(filter).populate('category');
        res.json(records);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getRecord = async (req, res) => {
    try {
        const record = await Record.findById(req.params.id).populate('category');
        if (!record) return res.status(404).json({ msg: 'Record not found' });
        res.json(record);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.updateRecord = async (req, res) => {
    const { name, description, category, active } = req.body;
    try {
        let record = await Record.findById(req.params.id);
        if (!record) return res.status(404).json({ msg: 'Record not found' });

        const existingCategory = await Category.findById(category);
        if (!existingCategory) {
            return res.status(400).json({ msg: 'Category does not exist' });
        }

        record.name = name;
        record.description = description;
        record.category = category;
        record.active = active;

        await record.save();
        res.json(record);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.deleteRecord = async (req, res) => {
    try {
        await Record.findOneAndDelete({ _id: req.params.id });
        res.json({ msg: 'Record removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.bulkDeleteRecords = async (req, res) => {
    const { ids } = req.body;
    try {
        await Record.deleteMany({ _id: { $in: ids } });
        res.json({ msg: 'Records removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
