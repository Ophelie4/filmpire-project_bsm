import React, { useEffect } from 'react';
import { Divider, List, ListItem, ListItemText, ListsSubHeader, ListItemIcon, Box, CircularProgress, ListSubheader } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';

import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';

import useStyles from './styles';

import { useGetGenresQuery } from '../../services/TMDB';

const categories = [
  { label: 'Popular', value: 'popular' },
  { label: 'Top Rated', value: 'top_rated' },
  { label: 'Upcoming', value: 'upcoming' },
];

const blueLogo = 'https://fontmeme.com/permalink/210930/8531c658a743debe1e1aa1a2fc82006e.png';
const redLogo = 'https://fontmeme.com/permalink/210930/6854ae5c7f76597cf8680e48a2c8a50a.png';

const Sidebar = ({ setMobileOpen }) => {
  const { genreIdOrCategoryName } = useSelector((state) => state.currentGenreOrCategory);
  const theme = useTheme();
  const classes = useStyles();
  const { data, isFetching } = useGetGenresQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    setMobileOpen(false);
  }, [genreIdOrCategoryName]);

  return (
    <>
      <Link to="/" className={classes.imageLink}>
        <img className={classes.image} src={theme.palette.mode === 'light' ? blueLogo : redLogo} alt="Filmpire logo" />
      </Link>
      <Divider />
      <List>
        <ListSubheader>Categories</ListSubheader>
        {categories.map(({ label, value }) => (
          <Link key={value} className={classes.links} to="/">
            <ListItem onClick={() => dispatch(selectGenreOrCategory(value))} button>
              {/* <ListItemIcon>
                <img src={redLogo} alt="" className={classes.genreImages} height={30} />
              </ListItemIcon> */}
              <ListItemText primary={label} />
            </ListItem>
          </Link>
        ))}

        <Divider />

        <ListSubheader>Genres</ListSubheader>

        {isFetching ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        )
          : data.genres.map(({ name, id }) => (
            <Link key={name} className={classes.links} to="/">
              <ListItem onClick={() => dispatch(selectGenreOrCategory(id))} button>
                {/* <ListItemIcon>
                <img src={redLogo} alt="" className={classes.genreImages} height={30} />
              </ListItemIcon> */}
                <ListItemText primary={name} />
              </ListItem>
            </Link>
          ))}

      </List>
    </>
  );
};

export default Sidebar;
