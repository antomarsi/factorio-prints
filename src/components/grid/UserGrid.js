import axios                         from 'axios';
import React, {useContext, useState} from 'react';
import Container                     from 'react-bootstrap/Container';
import Row                           from 'react-bootstrap/Row';
import {useQuery}                    from 'react-query';
import {useParams}                   from 'react-router-dom';

import SearchContext  from '../../context/searchContext';
import UserContext    from '../../context/userContext';
import useDisplayName from '../../hooks/useDisplayName';

import BlueprintThumbnail  from '../BlueprintThumbnail';
import LoadingIcon         from '../LoadingIcon';
import PageHeader          from '../PageHeader';
import EfficientSearchForm from '../search/EfficientSearchForm';
import EfficientTagForm    from '../search/EfficientTagForm';
import PaginationControls  from './PaginationControls';

function UserGrid()
{
	const [page, setPage]             = useState(1);
	const {titleFilter, selectedTags} = useContext(SearchContext);
	const {user}                      = useContext(UserContext);

	const {userId} = useParams();

	const fetchBlueprintSummaries = async (page = 1, titleFilter, selectedTags, userId) =>
	{
		const url    = `${process.env.REACT_APP_REST_URL}/api/user/${userId}/blueprintSummaries/page/${page}`;
		const params = new URLSearchParams();
		params.append('title', titleFilter);
		selectedTags.forEach(tag => params.append('tag', '/' + tag + '/'));
		const result = await axios.get(url, {params});
		return result.data;
	};

	const options = {
		keepPreviousData: true,
		placeholderData : {_data: [], _metadata: {pagination: {numberOfPages: 0, pageNumber: 0}}},
	};
	const result  = useQuery(['user', userId, page, titleFilter, selectedTags], () => fetchBlueprintSummaries(page, titleFilter, selectedTags, userId), options);

	const displayNameResult = useDisplayName(userId);

	// TODO: Refactor out grid commonality

	const {isLoading, isError, data, isPreviousData} = result;
	const {isLoading: isDisplayNameLoading, data: displayNameData} = displayNameResult;

	if (isError || displayNameData._data === null)
	{
		console.log({result});
		return (
			<>
				{'Error loading blueprint summaries.'}
			</>
		);
	}

	const {_data: blueprintSummaries, _metadata: {pagination: {numberOfPages, pageNumber}}} = data;


	const getTitle = () =>
	{
		const ownedByCurrentUser = user && user.uid === userId;
		const you                = ownedByCurrentUser ? ' (You)' : '';

		if (isDisplayNameLoading)
		{
			return (
				<span>
					{'Blueprints by '}
					<LoadingIcon isLoading={isDisplayNameLoading} />
				</span>
			);
		}

		return (
			<span>
				{`Blueprints by ${displayNameData._data.displayName || '(Anonymous)'}${you}`}
			</span>
		);
	};


	return (
		<Container fluid>
			<PageHeader title={getTitle()} />
			<Row>
				<EfficientSearchForm />
				<EfficientTagForm />
			</Row>
			{isLoading && <Row>
				<LoadingIcon isLoading={isLoading} />
				{' Loading blueprints'}
			</Row>}
			<Row className='justify-content-center'>
				{
					blueprintSummaries.map(blueprintSummary =>
						(
							<BlueprintThumbnail
								key={blueprintSummary.key}
								blueprintSummary={blueprintSummary}
							/>
						))
				}
			</Row>
			<PaginationControls
				page={page}
				setPage={setPage}
				pageNumber={pageNumber}
				numberOfPages={numberOfPages}
				isPreviousData={isPreviousData}
			/>
		</Container>
	);
}

export default UserGrid;