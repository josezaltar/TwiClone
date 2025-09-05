// src/pages/Followers/index.tsx
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { RealAPI, User } from '../../lib/realApi';
import UserRow from '../../components/UserRow';

import { Container, Header, List } from './style';

type Row = { user: User; isFollowing: boolean };

export default function Followers() {
  const { handle } = useParams<{ handle: string }>();

  const { data = [] } = useQuery<Row[]>({
    queryKey: ['followers', handle],
    queryFn: () => RealAPI.listFollowersByHandle(handle!),
    enabled: !!handle,
  });

  return (
    <Container>
      <Header>Seguidores · @{handle}</Header>
      <List>
        {data.map(({ user, isFollowing }) => (
          <UserRow key={user.id} user={user} isFollowing={isFollowing} />
        ))}
      </List>
    </Container>
  );
}
