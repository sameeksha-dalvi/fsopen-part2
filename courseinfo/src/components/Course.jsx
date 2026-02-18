const Course = ({ courses }) => {
  console.log("Course :", { courses })

  return (
    <>
      {courses.map(course => {
        return (
          <div key={course.id}>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
          </div>

        )
      })}
    </>
  )
}


const Header = (props) => {
  console.log("Header ", props)
  return (
    <>
      <h1>{props.name}</h1>
    </>
  )
}

const Part = ({ part }) => {
  return (
    <>
      <p>
        {part.name} {part.exercises}
      </p>
    </>
  )
}

const Content = ({ parts }) => {
  return (
    <>
      {parts.map(part => <Part key={part.id} part={part} />)}
    </>
  )

}


const Total = ({ parts }) => {
  console.log("Total : ", parts);

  const total = parts.reduce((s, p) => s + p.exercises, 0);
  console.log("totaltotal" + total);
  return (
    <>
      <p>Number of exercises {total}
      </p>
    </>
  )
}

export default Course