import React from 'react'
import {Navbar,Footer,Container} from '../Components'
import classes from './Layout.module.css'

export default function Layout({container,children,noPadding}) {
	return (
		<div className={classes.layout}>
			<Navbar/>
			<div className={classes.layoutContainer} style={noPadding ? {padding:0} : {}}>
				{
					container?
					(
						<Container>
							{children}
						</Container>	
					)
					:
					(
					<>{children}</>
					)
				}
			</div>
			<Footer/>
		</div>
	)
}