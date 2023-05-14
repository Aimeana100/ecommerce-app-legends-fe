import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import axios from 'axios';
import { RiCloseFill } from 'react-icons/ri';
import {
  selectUsers,
  fetchUsersStatus,
  updateUserById,
  fetchUsers,
  selectUpdateMsg,
} from '../../../../redux/reducers/appUsersManager/manageUsersReducer';
import {
  selectRoles,
  fetchRoles,
} from '../../../../redux/reducers/appUsersManager/getUsersRole';
import TableHeader from '../../../table/TableHeader';
import TableRow from '../../../table/TableRow';
import SingleUserView from '../../../table/singleUserView';
import { URL } from '../../../../views/auths/Login';
import FilterUsers from '../../../table/FilterUsers';

const Users = () => {
  const users = useSelector(selectUsers);
  const fetchStatus = useSelector(fetchUsersStatus);
  const roles = useSelector(selectRoles);
  const message = useSelector(selectUpdateMsg);
  const [filteredUsers, setFilteredUsers] = useState('All');

  const [selctedUser, setSelectedUser] = useState(null);
  const [loader, setLoader] = useState(false);
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.currentUser);
  const handleRoleChange = (e, id) => {
    const roleId = e.target.value;
    document.body.style.overflow = 'hidden';
    dispatch(updateUserById({ id, roleId }));
    if (message !== '') {
      toast.success(message, { theme: 'colored' });
    }
  };
  const handleUserOnclick = (id) => {
    setLoader(true);
    axios
      .get(`${URL}/api/admin/users/${id}?lang=${i18n.language}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setSelectedUser(response.data.data[0]);
        document.body.style.overflow = 'hidden';
        setLoader(false);
      });
  };
  useEffect(() => {
    dispatch(fetchUsers()).unwrap();
    dispatch(fetchRoles());
  }, [dispatch, token]);

  const HandleRemoveUserBox = () => {
    setSelectedUser(null);
    document.body.style.overflow = 'scroll';
  };
  const getFilteredUsers = users.filter((user) => {
    if (filteredUsers === 'vendor') {
      return user.role?.name === 'vendor';
    }
    if (filteredUsers === 'admin') {
      return user.role?.name === 'admin';
    }
    if (filteredUsers === 'buyer') {
      return user.role?.name === 'buyer';
    }
    return user;
  });
  const handleFilteredValues = (filterValue) => {
    setFilteredUsers(filterValue);
  };
  return (
    <div className="bg-gray-200 pt-20 ml-2 md:w-full md:overflow-scroll">
      <div>
        <FilterUsers FilterUsers={handleFilteredValues} />
      </div>
      <div
        className={
          fetchStatus === 'loading' || loader
            ? 'sticky ml-[40%] top-[50%] mb-[35%]'
            : ' hidden'
        }
      >
        <div className="w-20 h-20 border-slate-400 border-2 rounded-full" />
        <div className="w-20 h-20 border-blue-700 border-t-2 animate-spin rounded-full absolute left-0 top-0" />
      </div>
      {selctedUser && (
        <div className="sticky top-1/4 ml-[22%] w-full md:left-0 mb-[15%]">
          <SingleUserView
            token={token}
            id={selctedUser.id}
            user={selctedUser}
            closeIcon={<RiCloseFill size={20} />}
            removeUserBox={HandleRemoveUserBox}
          />
        </div>
      )}
      <table
        className={
          selctedUser || loader || fetchStatus === 'loading'
            ? 'hidden mx-auto pt-20 w-full  md:text-xs md:pl-3 md:overflow-scroll'
            : 'mx-auto pt-20 w-full  md:text-xs md:pl-3 md:overflow-scroll'
        }
      >
        <thead>
          <TableHeader
            className="bg-gray-100 shadow-md mt-20"
            fistName={t('Firstname')}
            lastName={t('Lastname')}
            email={t('emailaddress')}
            dateofbirth={t('dateofbirth')}
            gender={t('gender')}
            status={t('Acc_status')}
            rolename={t('role')}
          />
        </thead>
        <tbody>
          {getFilteredUsers &&
            getFilteredUsers
              .sort((a, b) => a.firstname.localeCompare(b.firstname))
              .map((user, index) => (
                <TableRow
                  numbering={index + 1}
                  key={user.id}
                  id={user.id}
                  className=" mx-auto bg-white shadow-sm border-2 border-gray-100 hover:cursor-pointer hover:bg-slate-100"
                  fistName={user.firstname}
                  lastName={user.lastname}
                  email={user.email}
                  dateofbirth={user.dateofbirth}
                  gender={user.gender}
                  status={user.status}
                  rolename={user.role?.name}
                  handleRoleChange={handleRoleChange}
                  onUserClick={(id) => handleUserOnclick(id)}
                  roles={roles}
                />
              ))}
        </tbody>
      </table>
      <span
        className={
          selctedUser ? 'hidden' : 'font-light text-sm flex justify-end mx-8'
        }
      >
        Showing
        <span className="font-medium"> {getFilteredUsers?.length} </span>
        users
      </span>
    </div>
  );
};
export default Users;
