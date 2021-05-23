import { getUserProfile } from 'actions/users/users';
import { JSX } from 'jsx/jsx';
import { userProfileStore } from 'store/users.store';
import { requestsStore } from 'store/requests.store';
import { HOST } from 'constants/api';
import { cn } from 'utils/cn';
import { isMobile } from 'utils/isMobile';

import './style.scss';

const userSubscribers = cn('userSubscribers');
const userSubscribersMob = cn('userSubscribers-mob');

export const UserSubscribers = () => {
    if (requestsStore.userSubscribers) {
        requestsStore.userSubscribers = false;
        getUserProfile(userProfileStore.profile.user_id);
    }

    return isMobile() ? (
        <div class={userSubscribersMob()}>
            <div class={userSubscribersMob('subscribers')}>
                {userProfileStore.profile.subscribers.map((item) => (
                    <div class={userSubscribersMob('subscriber')}>
                        <img class={userSubscribersMob('photo-subscriber')} src={HOST + item?.photo} />
                        <div class={userSubscribersMob('name-subscriber')}>{item?.nickname}</div>
                    </div>
                ))}
            </div>
        </div>
    ) : (
        <div class={userSubscribers()}>
            <div class={userSubscribers('subscribers')}>
                {userProfileStore.profile.subscribers.map((item) => (
                    <div class={userSubscribers('subscriber')}>
                        <img class={userSubscribers('photo-subscriber')} src={HOST + item?.photo} />
                        <div class={userSubscribers('name-subscriber')}>{item?.nickname}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};
