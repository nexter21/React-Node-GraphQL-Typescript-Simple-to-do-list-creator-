import mongoose, { Schema, Document } from 'mongoose';
const OurSchema = mongoose.Schema;

interface ItemType extends Document {
  data: string;
}

const ItemSchema: Schema = new OurSchema({
  data: {
    type: String,
    required: true,
  },
});

const Item = mongoose.model<ItemType>('items', ItemSchema);

export default Item;
