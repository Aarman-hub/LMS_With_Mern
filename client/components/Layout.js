import React from 'react'
import Head from 'next/head';

const Layout = ({title, description, children}) => {
  return (
    <>
        <Head>
            <title>{title ? title : "Arna" } || LMS </title>
            {description && <meta name='description' content={description} />}
        </Head>
        {children}
    </>
  )
}

export default Layout