import React from 'react'
import './Searchbar.css'
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import {IconButton} from '@material-ui/core'

export default function Searchbar() {
	return (
		<div className='searchbar'>
			<div className='container searchbar-wrapper'>
				<div className='searchbar-grid'>
					<TextField label="Product Name" />
					<TextField label="Location" />
					<TextField label="Price From" />
					<TextField label="Price To" />
					<IconButton className='search'>
						<SearchIcon/>
					</IconButton>
				</div>
			</div>
		</div>
	)
}