import { useParams, useOutletContext } from 'react-router-dom'
export default function Task() {
	const { taskId } = useParams();
	const [todos] = useOutletContext();
	const todo = todos.find((each) => each._id === taskId);
	if (todo) {
		return (
			<div>
				<h1 style={{ "margin": "20px", "textAlign": "center", "color": "red" }}>Task Details</h1>
				<h2 style={{ "margin": "20px" }}>Task: {todo.text}</h2>
				<h2 style={{ "margin": "20px" }}>Time: {todo.starttime}</h2>
				<div style={{ "margin": "20px", "padding": "5", "color": "white", "fontsize": "6", "lineHeight": "130%" }}>
					`On behalf of the English Department, we would like to cordially invite students and staff from all faculties to the symposium "Moving towards collective action: activism and academia" that will take place in Kiel (and via Zoom) on May 14 and 15. The symposium is supported by the initiative "Frauen aufs Podium," the CAU Diversity Fund and the German Association for American Studies.

					Everyone who is interested in diversity in higher education, questions of accessibility and equity in teaching, disability studies and anti-racist practice is welcome to attend. The CAU has been very invested in foregrounding the topic of diversity through different events in the last years, and this symposium will add to continued efforts to address questions of accessibility, anti-racist and anti-ableist practice in both teaching and research at CAU. The conference language will be English.

					We have found two fantastic keynote speakers, Dr. Emily Ngubia Kessé (Freiburg) and Prof. Dr. Margaret Price (Director of Disability Studies, Ohio State University) who will both attend in person and will speak about different modes of anti-racist and anti-ableist action and collective accountability. In addition to several panels, curator and activist Noa Winter will offer a workshop titled "Ableism in Academia - A Space for Reflection and Action." (Please note that the workshop will not be available via Zoom).

					For additional information, please refer to our detailed description of the symposium and the symposium's program.`
				</div>
			</div>
		)
	} else {
		return (<h1 style={{ "margin": "20px", "textAlign": "center", "color": "red" }}>Unkown Task ID, click one of the task in the list</h1>)
	}

}