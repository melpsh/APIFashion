import mongoose from 'mongoose'

const ordersSchema = new mongoose.Schema({
    orderTitle: String,
    description: String,
    ProposedPrice: Number,
    imageUrl: String,
    TransactionMethod: String,
    qualityGrade: String,
    packing: String,
    RequestedVolume: String,
    DeliveryDeadline: Date,
    DeliveryProvince: String,
    DeliveryCity: String,
    destinationCountry: String,
    category: String,
    create_at: {
        type: Date,
        default: Date.now
    },
    updated_at: Date,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },
})


export default mongoose.model("Orders", ordersSchema)
