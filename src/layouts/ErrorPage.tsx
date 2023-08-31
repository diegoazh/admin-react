import { useNavigate, useRouteError } from 'react-router-dom';
import { IAppError } from '../interfaces';
import { Button, Code } from '@nextui-org/react';

export function ErrorPage() {
  const error = useRouteError() as IAppError | undefined;
  const navigate = useNavigate();

  console.error(error);

  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen text-gray-300">
      <h1 className="text-9xl drop-shadow-md mb-4">{error?.status || 500}</h1>
      <div className="mb-2">
        <Code>{`${error?.statusText || error?.message}`}</Code>
      </div>
      <p className="text-2xl mb-2">You found a secret place 🤓</p>
      <div>
        <Button
          variant="light"
          color="primary"
          size="lg"
          onClick={() => navigate('/')}
        >
          Take me back to home page
        </Button>
      </div>
    </div>
  );
}
