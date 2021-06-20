import React, { useState } from "react";
import { Layout } from "../../Layout";
import { InputSelect } from "../../Components";
import { TextField, Button, Switch, MenuItem } from "@material-ui/core";

import styles from "./AddEventPage.module.css";

import axios from "axios";

import { useToasts } from "react-toast-notifications";

export default function AddEventPage() {
	const { addToast } = useToasts();

	let [fields, setFields] = useState({
		name: "",
		zipcode: "",
		description: "",
		start: "",
		end: "",
		image: null,
		imgUrl: null,
	});

	let imageOnChange = (e) => {
		if (e.target.files[0]) {
			let imgUrl = URL.createObjectURL(e.target.files[0]);
			setFields({ ...fields, image: e.target.files[0], imgUrl });
		}
	};

	let clickHandler = () => {
		let formdata = new FormData();
		let { name, zipcode, image, description, start, end } = fields;
		formdata.append("name", name);
		formdata.append("zipcode", zipcode);
		formdata.append("start", start);
		formdata.append("end", end);
		formdata.append("image", image);
		formdata.append("description", description);

		axios({
			method: "post",
			url: "/user/createEvent",
			data: formdata,
			headers: {
				Authorization: localStorage.getItem("token"),
			},
		}).then((res) => {
			let { status, msg, appearance } = res.data;
			if (status) {
				setFields({
					name: "",
					zipcode: "",
					description: "",
					start: "",
					end: "",
					image: null,
					imgUrl: null,
				});
			}
			addToast(res.data.msg, { appearance });
		});
	};

	return (
		<Layout container>
			<div className={styles.addEvent}>
				<div className={styles.formImage}>
					{fields.imgUrl == null ? (
						<div className={styles.fileWrapper}>
							<input
								type="file"
								id={styles.image}
								onChange={imageOnChange}
							/>
							<label for={styles.image}>
								<img src="default.jpg" />
							</label>
						</div>
					) : (
						<div className={styles.imageWrapper}>
							<img
								className={styles.imageDisplay}
								src={fields.imgUrl}
							/>
							<div
								className={`${styles.absolute} ${styles.fileWrapper}`}
							>
								<input
									type="file"
									id={styles.image}
									onChange={imageOnChange}
								/>
								<label for={styles.image}>
									<img src="default.jpg" />
								</label>
							</div>
						</div>
					)}
				</div>
				<div className={styles.formFields}>
					<div>
						<h1>Create Event</h1>
						<div>
							<TextField
								onChange={(e) =>
									setFields({
										...fields,
										name: e.target.value,
									})
								}
								value={fields.name}
								label="Name"
								className={styles.formInput}
								fullWidth
								required
							/>
							<TextField
								onChange={(e) =>
									setFields({
										...fields,
										description: e.target.value,
									})
								}
								value={fields.description}
								label="Description"
								multiline
								rows={4}
								className={styles.formInput}
								fullWidth
								required
							/>
							<TextField
								onChange={(e) =>
									setFields({
										...fields,
										zipcode: parseInt(e.target.value),
									})
								}
								value={fields.zipcode}
								label="Zip Code"
								className={styles.formInput}
								type="number"
								fullWidth
								required
							/>
							<TextField
								id="date"
								label="Start"
								type="date"
								value={fields.start}
								onChange={(e) =>
									setFields({
										...fields,
										start: e.target.value,
									})
								}
								className={styles.formInput}
								InputLabelProps={{
									shrink: true,
								}}
								required
							/>
							<TextField
								id="date"
								label="End"
								type="date"
								value={fields.end}
								onChange={(e) =>
									setFields({
										...fields,
										end: e.target.value,
									})
								}
								className={styles.formInput}
								InputLabelProps={{
									shrink: true,
								}}
								required
							/>
							<Button
								onClick={clickHandler}
								className={styles.formButton}
								variant="contained"
							>
								Create Event
							</Button>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
}
