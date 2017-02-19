import React from 'react'
import { Route } from 'react-router'
import MainContainer from '../components/MainContainer'
import DowJonesContainer from '../components/DowJonesContainer'

export default (

  <Route component={MainContainer}>

	<Route path="/"
		   components={{main: DowJonesContainer}} />

  </Route>

)
