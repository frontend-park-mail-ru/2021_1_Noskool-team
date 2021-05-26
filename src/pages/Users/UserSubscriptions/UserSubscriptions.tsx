import { getUserProfile } from 'actions/users/users';
import { JSX } from 'jsx/jsx';
import { userProfileStore } from 'store/users.store';
import { requestsStore } from 'store/requests.store';
import { HOST } from 'constants/api';
import { cn } from 'utils/cn';
import { isMobile } from 'utils/isMobile';
import { redirectTo } from 'utils/render';
import { LINKS } from 'constants/links';

import './style.scss';

const userSubscriptions = cn('userSubscriptions');
const userSubscriptionsMob = cn('subscriptions-mob');

const onClickUser = (id: number) => () => {
    redirectTo(LINKS.user + `/${id}`);
};

export const UserSubsciptions = () => {
    if (requestsStore.userSubscriptions) {
        requestsStore.userSubscriptions = false;
        getUserProfile(userProfileStore.profile.user_id);
    }

    return isMobile() ? (
        <div class={userSubscriptionsMob()}>
            <div class={userSubscriptionsMob('subscriptions-mob')}>
                {userProfileStore.profile.subscriptions.map((item) => (
                    <div class={userSubscriptionsMob('all-subscription-mob')} onclick={onClickUser(item.user_id)}>
                        <img class={userSubscriptionsMob('photo-subscriptions-mob')} src={HOST + item?.photo} />
                        <div class={userSubscriptionsMob('name-subscriptions-mob')}>{item?.nickname}</div>
                    </div>
                ))}
            </div>
        </div>
    ) : (
        <div class={userSubscriptions()}>
            <div class={userSubscriptions('subscriptions')}>
                {userProfileStore.profile.subscriptions.map((item) => (
                    <div class={userSubscriptions('all-subscription')} onclick={onClickUser(item.user_id)}>
                        <img class={userSubscriptions('photo-subscriptions')} src={HOST + item?.photo} />
                        <div class={userSubscriptions('name-subscriptions')}>{item?.nickname}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};
