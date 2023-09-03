import { Tooltip } from '@nextui-org/react';
import {
  IconArticle,
  IconCategory,
  IconGauge,
  IconLogout,
  IconTags,
  IconUsers,
} from '@tabler/icons-react';
import { Outlet, useNavigate } from 'react-router-dom';
import { ReactComponent as Logo } from '../assets/logo.svg';

export function MainLayout() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-row w-screen h-screen">
      <div className="flex flex-col w-20 h-screen p-2 content-stretch items-stretch border-r">
        <div className="flex justify-center items-start py-4 h-auto">
          <Logo />
        </div>
        <div className="flex justify-center items-center h-full">
          <ul className="flex flex-col justify-around h-2/3 w-auto text-gray-400">
            <li className="flex justify-start cursor-pointer">
              <Tooltip color="foreground" content="Dashboard" placement="right">
                <IconGauge
                  className="inline-block"
                  onClick={() => navigate('/')}
                />
              </Tooltip>
            </li>
            <li className="flex justify-start cursor-pointer">
              <Tooltip color="foreground" content="Posts" placement="right">
                <IconArticle
                  className="inline-block"
                  onClick={() => navigate('/posts')}
                />
              </Tooltip>
            </li>
            <li className="flex justify-start cursor-pointer">
              <Tooltip
                color="foreground"
                content="Categories"
                placement="right"
              >
                <IconCategory
                  className="inline-block"
                  onClick={() => navigate('/categories')}
                />
              </Tooltip>
            </li>
            <li className="flex justify-start cursor-pointer">
              <Tooltip color="foreground" content="Tags" placement="right">
                <IconTags
                  className="inline-block"
                  onClick={() => navigate('/tags')}
                />
              </Tooltip>
            </li>
            <li className="flex justify-start cursor-pointer">
              <Tooltip color="foreground" content="Users" placement="right">
                <IconUsers
                  className="inline-block"
                  onClick={() => navigate('/users')}
                />
              </Tooltip>
            </li>
          </ul>
        </div>
        <div className="flex justify-center items-end h-1/3 p-4 text-gray-400">
          <Tooltip color="foreground" content="Log-out" placement="right">
            <IconLogout
              className="inline-block cursor-pointer"
              onClick={() => navigate('/')}
            />
          </Tooltip>
        </div>
      </div>
      <div className="flex w-screen h-screen p-4">
        <Outlet />
      </div>
    </div>
  );
}
