import React, { useContext, useState } from 'react'
import UserRoute from '../../components/routes/UserRoute';
import { Context } from '../../context';
import {useRouter} from 'next/router';
import axios from 'axios';

const index = () => {
  const [hidden, setHidden] = useState(false);

  const router = useRouter();

  const {
    state: { user },
  } = useContext(Context);

  return (
    <UserRoute>
      <h1 className='jumbotron text-center square'>
        <pre>{JSON.stringify(user, null, 4)}</pre>
      </h1>
    </UserRoute>
  )
}

export default index