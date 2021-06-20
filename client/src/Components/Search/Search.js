import React, { useRef, useEffect, useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import { IconButton } from "@material-ui/core";

import "./Search.css";

import axios from 'axios'

export default function Search(props) {
	let [searchString, setSearchString] = useState("");

	let inputRef = useRef(null);
	let inputWrapperRef = useRef(null);

	useEffect(() => {
		inputRef.current.addEventListener("focus", () => {
			inputWrapperRef.current.classList.add("onfocuswrapper");
		});
		inputRef.current.addEventListener("blur", () => {
			inputWrapperRef.current.classList.remove("onfocuswrapper");
		});
	}, []);

	let searchItems = (e) => {
		e.preventDefault();
		return
		axios({
			method:'post',
			url:'/user/searchItems',
			withCredentials:true,
			data:{searchString}
		})
		.then(res=>{
			
		})
	};

	return (
		<div {...props}>
			<form
				onSubmit={searchItems}
				ref={inputWrapperRef}
				className="searchWrapper"
			>
				<input
					ref={inputRef}
					placeholder="Search..."
					className="search"
					type="text"
				/>
				<IconButton id="search-icon" type="submit">
					<SearchIcon />
				</IconButton>
			</form>
		</div>
	);
}
