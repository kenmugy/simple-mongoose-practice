const mongoose = require('mongoose');

const { Schema, model } = mongoose;

mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true });

mongoose.connection
  .then(() => console.log('connected to database.........'))
  .catch(err => console.log('error connected to mongodb', err));

const courseSchema = new Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean
});

const Course = model('playground', courseSchema);

// creating course
async function createCourse() {
  const course = new Course({
    name: 'React.js course',
    author: 'mosh',
    tags: ['react', 'frontend'],
    isPublished: false
  });
  const result = await course.save();
  console.log(result);
}

// createCourse();

// getting course(s) from the database

async function getCourses() {
  const result = await Course.find({
    author: /kenmugy/i
  })
    .limit(4)
    .sort('name')
    .select('name author isPublished');
  console.log(result);
}

getCourses();
