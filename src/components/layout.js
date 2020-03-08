import React from 'react';
import Helmet from 'react-helmet';

//import { StaticQuery, graphql } from 'gatsby';

import './layout.css';

const Layout = ({ children }) => (
	<div>
		<Helmet>
			<title>
				Learning Forms. An ongoing archive of publications from studios
				of architecture schools
			</title>
			<meta
				name="robots"
				content="
            index,follow
          "
			/>
			<meta
				name="description"
				content="An ongoing archive of publications from studios of architecture schools"
			/>
			<meta
				name="og:description"
				content="An ongoing archive of publications from studios of architecture schools"
			/>
			<meta
				name="twitter:description"
				content="An ongoing archive of publications from studios of architecture schools"
			/>
			<meta name="og:title" content="Learning Forms" />
			<meta name="twitter:title" content="Learning Forms" />
			<link rel="icon" type="image/png" href="/favicon.png" />
		</Helmet>
		{children}
	</div>
);

export default Layout;
