const mongoose = require('mongoose')
//* Database Connectivity
mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log("Connected to MongoDB..."))
    .catch(err => console.error(`Error : ${err.message}`))

//* Model Schema
const courseSchema = new mongoose.Schema({
    name : String,
    author : String,
    tags : [ String ],
    date : { type : Date, default : Date.now },
    isPublished : Boolean
})

//* Model
const Course = mongoose.model('Course',courseSchema);

//* CRUD Methods
const createCourse = async (name, author, tags, isPublished) => {
    const course = new Course({
        name : name,
        author : author,
        tags : tags,
        isPublished : isPublished
    })
    //* To create a document in a collection
    const result = await course.save()
    console.log('User Created')
    console.log(result)
}
const getAllCourses = async () => {
    //* To Retrieve all documents of a collection
    const courses = await Course.find()
    console.log(courses)
}
const findCourses = async (findCond, sortCond={}, viewCond={}) => {
    pageNumber = 2
    pageSize = 1
    //* To Retrieve certain documents of a collection
    const courses = await Course
        .find(findCond)                     //? All documents satisfying findCond Property
        .skip((pageNumber -1) * pageSize)   //? skips the document from previous pages
        .limit(pageSize)                    //? limits the output documents
        .sort(sortCond)                     //? sorted in sortCond manner
        .select(viewCond)                   //? counts the documents satisfying findCond Property
    console.log(courses)
}
const updateCourse = async (id, newData) => {
    //* Query First Approach
    const course = await Course.findById(id)
    if(!course) return console.log('Invalid Id')
    console.log(course)
    course.set(newData)
    const result = await course.save()
    console.log(result)     
}

//?createCourse('React.JS', 'Mosh Hamedani', [ 'React', 'JS', 'Frontend' ], true)
//?getAllCourses()
//?findCourses({author : 'Mosh Hamedani'},{name : 1},{name:1, author :1})
//?findCourses({author : /^mosh/i},{name : 1},{name:1, author :1})
updateCourse('5fcf409454ec9a20a7c4a236',{ name : "Node.JS", author : "Mosh Hanedani" })