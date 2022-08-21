import { Box, Button, Flex, Icon, Text } from '@chakra-ui/react';
import {
  CountCommentsRequest,
  CountCommentsResponse,
  ENDPOINT_CONFIGS,
  GetUserRequest,
  GetUserResponse,
  Post,
} from '@codersquare/shared';
import { useQuery } from '@tanstack/react-query';
import { BsHeart } from 'react-icons/bs';
import { Link } from 'react-router-dom';

import { callEndpoint } from '../fetch';

export const PostCard = ({ id, title, url: postUrl, userId }: Post) => {
  const { method: getUserMethod, url: getUserUrl } = ENDPOINT_CONFIGS.getUser;
  const {
    data: user,
    error,
    isLoading,
  } = useQuery([`getuser${userId}`], () =>
    callEndpoint<GetUserRequest, GetUserResponse>(
      getUserUrl.replace(':id', userId),
      getUserMethod,
      {
        id: userId,
      }
    )
  );
  const { method: countCommentsMethod, url: countCommentsUrl } = ENDPOINT_CONFIGS.countComments;
  const { data: countCommentsRes } = useQuery([`countComments${id}`], () =>
    callEndpoint<CountCommentsRequest, CountCommentsResponse>(
      countCommentsUrl.replace(':postId', id),
      countCommentsMethod,
      { postId: id }
    )
  );

  const userName = isLoading || !user ? '...' : error ? '<unknown>' : user.userName;
  const commentsCount = countCommentsRes?.count ?? 0;

  return (
    <Flex m={4} gap={2} align="baseline">
      <Box position="relative" w={4}>
        <Icon
          position="absolute"
          top="-0.8rem"
          as={BsHeart}
          fill="gray"
          cursor="pointer"
          _hover={{ fill: 'brown' }}
        />
      </Box>

      <Box>
        <Flex align="center">
          <Link to={`/p/${id}`}>
            <Text color="gray.600" fontWeight="bold" pr={2}>
              {title}
            </Text>
          </Link>

          <Link to={`/p/${id}`}>
            <Text fontSize="sm" color="gray.400">
              ({postUrl})
            </Text>
          </Link>

          <Link to={`/p/${id}`}>
            <Button
              ml={2}
              variant="outline"
              borderColor="gray.300"
              borderRadius={4}
              p={2}
              size="xs"
              color="gray"
            >
              {commentsCount ? `${commentsCount} Comments` : 'Discuss'}
            </Button>
          </Link>
        </Flex>

        <Flex gap={1}>
          <Text fontSize="sm" color="gray.500">
            By:
          </Text>
          <Text fontSize="sm" fontWeight="bold" color="gray.500">
            {userName}
          </Text>
        </Flex>
      </Box>
    </Flex>
  );
};