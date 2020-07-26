import Item from '../models/item';

interface itemType {
  data: String;
}

const resolvers = {
  getAllItems: async () => {
    const allItems = await Item.find();
    console.log(allItems);
    return allItems;
  },
  addItem: async ({ item }) => {
    const newItem = new Item({
      data: item.data,
    });

    const ourItem = await newItem.save();
    console.log(ourItem);
    return ourItem;
  },
  editItem: async ({ id, item }) => {
    const oldItem = await Item.findById(id);
    if (oldItem?.data) {
      oldItem.data = item.data;
    }
    const res = await oldItem?.save();
    return res;
  },
  deleteItem: async ({ id }) => {
    await Item.findByIdAndRemove(id);
    return true;
  },
};

export default resolvers;
