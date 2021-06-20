import React, { useState, useEffect } from "react";

import styles from "./Home.module.css";

import { Layout } from "Layout";
import { Card, CardContainer, Container } from "Components";

import axios from "axios";

import { useDispatch, useSelector } from "react-redux";

import { useToasts } from "react-toast-notifications";

export default function Home() {
	const [events, setEvents] = useState([]);

	const { addToast } = useToasts();

	const user = useSelector((state) => state.user);

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
		<Layout noPadding>
			<div className={styles.heroWrapper}>
				<Container className={styles.verticalAlignCenter}>
					<h1>
						Welcome back <br />
						{user.fname}
					</h1>
				</Container>
			</div>
			<Container>
				<CardContainer>
					{events.map((event) => (
						<Card event={event} />
					))}
				</CardContainer>
			</Container>
		</Layout>
	);
}