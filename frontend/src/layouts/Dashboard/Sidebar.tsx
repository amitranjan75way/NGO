
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Drawer from 'react-modern-drawer';
import { motion } from 'framer-motion';
import 'react-modern-drawer/dist/index.css';
import style from './index.module.css';
import { useAppSelector } from '../../store/store';

// Sidebar items
const sidebarItems = [
  { label: "Profile", path: "/dashboard/profile", roles: ["ADMIN", "DONAR"] },
  { label: "Add Funding Plan", path: "/dashboard/add-plan", roles: ["ADMIN"] },
  { label: "Add Payment Method", path: "/dashboard/add-payment-method", roles: ["DONAR"] },
  { label: "Payment Methods", path: "/dashboard/payment-methods", roles: ["DONAR"] },
  { label: "Settings", path: "/dashboard/settings", roles: ["ADMIN", "DONAR"] }, 
];

// Animation Variants
const sidebarVariants = {
  hidden: { x: -250, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { type: "tween", duration: 0.3 } },
};

const itemVariants = {
  hidden: { x: -20, opacity: 0 },
  visible: (index: number) => ({
    x: 0,
    opacity: 1,
    transition: { delay: index * 0.1, duration: 0.3 },
  }),
};

const Sidebar: React.FC = () => {
  const { role } = useAppSelector((store) => store.auth);
  const [myRole, setMyRole] = useState('');
  useEffect(() => {
    if (role) {
      console.log(role);
      setMyRole(role);
    }
  }, [role])

  // Filter sidebar items based on the role
  const filteredItems = sidebarItems.filter(item => item.roles.includes(myRole));

  return (
    <Drawer open={true} direction="left" className={style.drawer} enableOverlay={false}>
      <motion.nav
        className={style.sidebar}
        initial="hidden"
        animate="visible"
        variants={sidebarVariants}
      >
        <ul className={style.navList}>
          {filteredItems.map((item, index) => (
            <motion.li
              key={item.path}
              className={style.navItem}
              variants={itemVariants}
              custom={index}
              initial="hidden"
              animate="visible"
            >
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  isActive ? `${style.navLink} ${style.activeNavLink}` : style.navLink
                }
              >
                {item.label}
              </NavLink>
            </motion.li>
          ))}
        </ul>
      </motion.nav>
    </Drawer>
  );
};

export default Sidebar;