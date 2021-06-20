import React, { useState, useEffect } from "react";
import { Layout } from "Layout";
import { Card, CardContainer } from "Components";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import styles from "./ProfilePage.module.css";

import { useToasts } from "react-toast-notifications";

export default function ProfilePage() {
	const [events, setEvents] = useState([]);

	const user = useSelector((state) => state.user);

	// let alert = useAlert();
	let dispatch = useDispatch()

	const { addToast } = useToasts();

	useEffect(() => {
		axios({
			url: "/user/events",
			headers: {
				Authorization: localStorage.getItem("token"),
			},
		}).then((res) => {
			if (res.data.status) {
				setEvents(res.data.events);
			} else {
				let { msg, appearance } = res.data;
				addToast(msg, { appearance });
			}
		});
	}, []);

	return (
		<Layout container>
			<div className={styles.profileSection}>
				<div className={styles.profileImg}>
					<img
						src={
							user?.profileImg
								? `http://localhost:7000/profileImages/${user.profileImg}`
								: "default.jpg"
						}
						className={styles.profileImage}
					/>
				</div>
				<div className={styles.profileDesc}>
					<h1 className={styles.name}>
						{user.fname} {user.lname}
					</h1>
					<p>{user.email}</p>
					<p>{events.length} events added</p>
				</div>
			</div>
			<div className={styles.yourItems}>
				{events.length == 0 ? (
					<p>
						Looks like you havent added any items. Want to{" "}
						<a href="">Add an Item?</a>
					</p>
				) : (
					<CardContainer>
						{events.map((event) => (
							<Card page="self" event={event} key={event._id} />
						))}
					</CardContainer>
				)}
			</div>
		</Layout>
	);
}
