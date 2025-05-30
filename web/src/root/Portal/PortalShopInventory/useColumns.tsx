import * as enums from '@data/vehicle/enums';
import { Vehicle } from '@data/vehicle/types';

import * as DataTable from '@components/DataTable';
import BadgeGroup from '@components/BadgeGroup';
import IconLabel from '@components/IconLabel';
import { useMemo } from 'react';
import { useLocationsAsEnumsQ } from '@data/location/queries';
import { TicketBadges } from '../PortalShopTickets/useColumns';
import { format } from 'date-fns';
import WarningBadge from '@components/WarningBadge';

//

export default function useColumns() {
  const locationEnumsQ = useLocationsAsEnumsQ();

  return useMemo(
    () =>
      [
        {
          key: 'regTag',
          name: '#',
          renderFn: (
            { regTag, id, isCustomerOwned, warnings = [] },
            { selected },
          ) => {
            const baseBadge = enums.find(isCustomerOwned);

            const variant = selected
              ? 'contrast'
              : warnings.length
                ? 'red'
                : 'outline';

            return warnings.length ? (
              <WarningBadge id={id} warnings={warnings} variant={variant} />
            ) : (
              <BadgeGroup
                badges={[
                  {
                    icon: baseBadge.icon,
                    label: isCustomerOwned ? `#${id}` : regTag,
                    variant,
                  },
                ]}
              />
            );
          },
        },

        {
          key: 'vehicleType',
          name: 'Type',
          renderFn: ({ vehicleType, bikeType, strollerType }) => (
            <IconLabel {...enums.find(vehicleType)}>
              {(strollerType || bikeType) && (
                <span className="text-muted-foreground pl-1">
                  {bikeType && enums.find(bikeType).label}
                  {strollerType && enums.find(strollerType).label}
                </span>
              )}
            </IconLabel>
          ),
        },

        {
          key: 'vehicleStatus',
          name: 'Status',
          renderFn: ({ vehicleStatus }) =>
            vehicleStatus && (
              <BadgeGroup badges={[enums.find(vehicleStatus)]} />
            ),
        },

        {
          key: 'locationId',
          name: 'Location',
          renderFn: ({ locationId }) =>
            locationEnumsQ.data && (
              <IconLabel
                {...locationEnumsQ.data.find((e) => e.value === locationId)!}
              />
            ),
        },

        {
          key: 'ticketIds',
          name: 'Tickets',
          renderFn: ({ ticketIds }) => <TicketBadges ticketIds={ticketIds} />,
        },

        {
          key: 'brand',
          name: 'Brand',
          renderFn: ({ brand }) =>
            brand && <IconLabel {...enums.find(brand)} />,
        },

        {
          key: 'size',
          name: 'Size',
          renderFn: ({ size }) => size && <IconLabel {...enums.find(size)} />,
        },

        {
          key: 'gearCount',
          name: 'Gears',
          renderFn: ({ gearCount }) =>
            !!gearCount && (
              <span className={gearCount === 1 ? 'opacity-50' : ''}>
                {gearCount}
              </span>
            ),
        },

        {
          key: 'brakeType',
          name: 'Brakes',
          renderFn: ({ brakeType }) =>
            brakeType && <IconLabel {...enums.find(brakeType)} />,
        },

        {
          key: 'batchCount',
          name: 'Batch count',
          renderFn: ({ batchCount }) =>
            !!batchCount && <span>{batchCount}</span>,
        },

        {
          key: 'comment',
          name: 'Comment',
          renderFn: (row) => (
            <span className="text-muted-foreground text-elipsis">
              {row.comment}
            </span>
          ),
        },

        {
          key: 'createdAt',
          name: 'Created at',
          renderFn: ({ createdAt }) => (
            <IconLabel label={format(new Date(createdAt), 'yyyy-MM-dd')} />
          ),
        },

        {
          key: 'updatedAt',
          name: 'Edited at',
          renderFn: ({ updatedAt }) => (
            <IconLabel label={format(new Date(updatedAt), 'yyyy-MM-dd')} />
          ),
        },
      ] as Array<DataTable.Column<Vehicle>>,
    [locationEnumsQ.data],
  );
}
