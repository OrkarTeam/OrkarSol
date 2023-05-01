import user from '@/app/assets/images/user.svg';
import create from '@/app/assets/images/create.svg';
import favorites from '@/app/assets/images/favorites.svg';
import settings from '@/app/assets/images/settings.svg';
import rightarrow from '@/app/assets/images/right-arrow.svg';

export const userSide = [
    {
        id: 1,
        name: 'profile',
        logo: user,
        end: rightarrow
    },
    {
        id: 2,
        name: 'create',
        logo: create,
        end: rightarrow
    },
    {
        id: 3,
        name: 'favourites',
        logo: favorites,
        end: rightarrow
    },
    {
        id: 4,
        name: 'settings',
        logo: settings,
        end: rightarrow
    }
]