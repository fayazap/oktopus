import { useState } from 'react';
import NextLink from 'next/link';
import PropTypes from 'prop-types';
import { Box, ButtonBase, Collapse, SvgIcon } from '@mui/material';
import ChevronDownIcon from '@heroicons/react/24/outline/ChevronDownIcon';
import ChevronUpIcon from '@heroicons/react/24/outline/ChevronUpIcon';
import { usePathname } from 'next/navigation';

export const SideNavItem = (props) => {
  const { active = false, disabled, external, icon, path, title, children, padleft } = props;

  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isItemActive = (currentPath, itemPath) => {
    if (currentPath === itemPath) {
      return true;
    }

    if (currentPath.includes(itemPath) && itemPath !== '/' && itemPath !== '/mass-actions') {
      return true;
    }

    return false;
  }

  const linkProps = path
    ? external
      ? {
        component: 'a',
        href: path,
        target: '_blank'
      }
      : {
        component: NextLink,
        href: path
      }
    : {};

    // console.log('padleft', padleft);
    // console.log('path', path);
    // console.log('title', title);

  return (
    <li>
      <ButtonBase
        sx={{
          alignItems: 'center',
          borderRadius: 1,
          display: 'flex',
          ...(disabled ? {cursor: 'default'}: {cursor: 'pointer'}),
          justifyContent: 'flex-start',
          pl: padleft,
          pr: '16px',
          py: '6px',
          textAlign: 'left',
          width: '100%',
          ...(active && {
            backgroundColor: 'rgba(255, 255, 255, 0.04)'
          }),
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.04)'
          }
        }}
      >
        {icon && (
          <Box
            component="span"
            sx={{
              alignItems: 'center',
              color: 'neutral.400',
              display: 'inline-flex',
              justifyContent: 'center',
              mr: 2,
              ...(active && {
                color: '#FFFFFF'
              })
            }}
            {...linkProps}
          >
            {icon}
          </Box>
        )}
        <Box
          component="span"
          sx={{
            color: 'neutral.400',
            flexGrow: 1,
            fontFamily: (theme) => theme.typography.fontFamily,
            fontSize: 14,
            fontWeight: 600,
            lineHeight: '24px',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
            ...(active && {
              color: 'common.white'
            }),
            ...(disabled && {
              color: 'neutral.500'
            })
          }}
          {...linkProps}
        >
          {title}
        </Box>
        { children &&
            <Box
            onClick={()=>setOpen(!open)}
            component="span"
            sx={{
              color: 'neutral.400',
              flexGrow: 1,
              display: 'flex',
              justifyContent: 'flex-end',
              fontFamily: (theme) => theme.typography.fontFamily,
              fontSize: 14,
              fontWeight: 600,
              lineHeight: '24px',
              whiteSpace: 'nowrap',
              ...(active && {
                color: 'common.white'
              }),
              ...(disabled && {
                color: 'neutral.500'
              })
            }}
          >
          {
            open ? 
          <SvgIcon fontSize='8px'>
            <ChevronDownIcon/>
          </SvgIcon>:
          <SvgIcon fontSize='8px'>
            <ChevronUpIcon />
          </SvgIcon>
    }
          </Box>
        }
      </ButtonBase>
      <Collapse in={open}>
        {
            children &&
              (
                children.map((child) => {
                  return (
                    <SideNavItem
                      active={isItemActive(pathname, child.path)}
                      disabled={child.disabled}
                      external={false}
                      icon={child.icon}
                      key={child.title}
                      path={child.path}
                      title={child.title}
                      children={child?.children}
                      padleft={padleft + 2}
                    />
                  );
                })
              )
          }
        </Collapse>
    </li>
  );
};

SideNavItem.propTypes = {
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  external: PropTypes.bool,
  icon: PropTypes.node,
  path: PropTypes.string,
  title: PropTypes.string.isRequired
};
