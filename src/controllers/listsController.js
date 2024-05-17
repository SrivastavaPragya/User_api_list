const fs = require('fs');
const csv = require('csv-parser');
const List = require('../models/List');
const User = require('../models/User');

const createList = async (req, res) => {
  try {
    const { title, customProperties } = req.body;
    const list = new List({ title, customProperties });
    await list.save();
   return res.status(201).json({ message:"list created successfully",list});
  } catch (error) {
     return res.status(400).send(error.message);
  }
};

const uploadUsers = async (req, res) => {
  const listId = req.params.id;
  const file = req.file;

  try {
    const list = await List.findById(listId);
    if (!list) {
      return res.status(404).json({message:'List not found'});
    }

    const customPropertiesMap = list.customProperties.reduce((map, prop) => {
      map[prop.title] = prop.fallbackValue;
      return map;
    }, {});

    const users = [];
    const emails = new Set();
    const duplicateEmails = [];
    fs.createReadStream(file.path)
      .pipe(csv())
      .on('data', (row) => {

        
        if (emails.has(row.email)) {
            duplicateEmails.push(row.email);
          } else {
            emails.add(row.email);
    
            const user = {
              name: row.name,
              email: row.email,
              listId,
              customProperties: { ...customPropertiesMap },
            };
    
            list.customProperties.forEach((prop) => {
              if (row[prop.title]) {
                user.customProperties[prop.title] = row[prop.title];
              }
            });
    
            users.push(user);
          }
      })
      .on('end', async () => {

        if (duplicateEmails.length > 0) {
            return res.status(400).json({
              message: 'Duplicate emails found in the CSV file',
              duplicateEmails
            });
          }
        try {
          await User.insertMany(users);
         return res.status(201).json({users});
        } catch (error) {
          return res.status(400).send(error.message);
        } finally {
          fs.unlinkSync(file.path); // Remove file after processing
        }
      });
  } catch (error) {
   return res.status(500).json(error.message);
  }
};

module.exports = {
  createList,
  uploadUsers
};
