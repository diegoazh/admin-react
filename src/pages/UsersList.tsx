import {
  Chip,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from '@nextui-org/react';
import { IconEye, IconEdit, IconTrash, IconPlus } from '@tabler/icons-react';
import capitalize from 'lodash.capitalize';
import lowercase from 'lodash.lowercase';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { UserModel, useUsers } from '../hooks';
import { IAppTableColumn } from '../interfaces';
import { UsersListSkeleton } from './squeletons';

// TODO: Move the columns name to translations
export function UsersList() {
  const { t } = useTranslation();
  const { loading, users } = useUsers();
  const getValue = useCallback(
    (key: keyof UserModel | 'actions', item: UserModel): JSX.Element => {
      switch (key) {
        case 'enabled': {
          return item[key] ? (
            <Chip color="success">{t('users.enabled')}</Chip>
          ) : (
            <Chip color="danger">{t('users.disabled')}</Chip>
          );
        }
        case 'emailVerified': {
          return item[key] ? (
            <Chip color="success">{t('users.verified')}</Chip>
          ) : (
            <Chip color="danger">{t('users.notVerified')}</Chip>
          );
        }
        case 'requiredActions': {
          return item[key].length ? (
            <>{item[key].toString()}</>
          ) : (
            <Chip>{t('users.noActions')}</Chip>
          );
        }
        case 'firstName':
        case 'lastName': {
          return <>{capitalize(item[key])}</>;
        }
        case 'actions': {
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip content="Details">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <IconEye />
                </span>
              </Tooltip>
              <Tooltip content="Edit user">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <IconEdit />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Delete user">
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                  <IconTrash />
                </span>
              </Tooltip>
            </div>
          );
        }
        default:
          return <>{item[key]}</>;
      }
    },
    [t]
  );
  const columnBuilder = useCallback(
    (column: IAppTableColumn) => (
      <TableColumn key={column.key}>{column.label}</TableColumn>
    ),
    []
  );
  const rowBuilder = useCallback(
    (item: UserModel) => (
      <TableRow key={item.id}>
        {(columnKey) => (
          <TableCell>
            {getValue(columnKey as keyof UserModel | 'actions', item)}
          </TableCell>
        )}
      </TableRow>
    ),
    [getValue]
  );

  const rawColumns = [
    'username',
    'email',
    'enabled',
    'emailVerified',
    'firstName',
    'lastName',
    'requiredActions',
    'actions',
  ];
  const columns: IAppTableColumn[] = rawColumns.map((col) => ({
    key: col,
    label: capitalize(lowercase(col)),
  }));

  return loading ? (
    <UsersListSkeleton />
  ) : (
    <div className="flex flex-col w-full">
      <h1 className="text-3xl text-left mb-4">{t('users.title')}</h1>
      <div className="flex justify-end w-3/4 py-2">
        <Tooltip content="Create user">
          <span className="text-lg text-white cursor-pointer active:opacity-50 bg-success rounded-full p-2">
            <IconPlus />
          </span>
        </Tooltip>
      </div>
      <Table className="w-3/4">
        <TableHeader columns={columns}>{columnBuilder}</TableHeader>
        <TableBody items={users}>{rowBuilder}</TableBody>
      </Table>
    </div>
  );
}
