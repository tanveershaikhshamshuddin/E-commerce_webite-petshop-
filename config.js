export default{
    MONGODB_URL:process.env.MONGODB_URL || "mongodb+srv://tancred:Tancred@123@cluster0.iolvh.mongodb.net/test?retryWrites=true&w=majority",
    JWT_SECRET:process.env.JWT_SECRET || 'somethingsecret'
}