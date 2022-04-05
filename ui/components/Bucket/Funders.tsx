import thousandSeparator from "utils/thousandSeparator";
import Avatar from "../Avatar";

export default function Funders({ bucket, round, currentUser }) {
  if (!bucket) return null;
  return (
    <div className="bg-white border-b-default">
      {bucket.funders.length ? (
        <div className="page grid gap-10 grid-cols-1 md:grid-cols-sidebar">
          <ul className="py-6 space-y-4">
            {bucket.funders.map((contribution) => (
              <li className="flex items-center space-x-3" key={contribution.id}>
                <Avatar
                  user={contribution.roundMember.user}
                  highlighted={
                    currentUser?.id === contribution.roundMember.user.id
                  }
                />

                <span>
                  {contribution.roundMember.user.username} -{" "}
                  {thousandSeparator(contribution.amount / 100)}{" "}
                  {round.currency}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="page">
          <div className="text-xl font-medium text-gray-500 py-10 text-center">
            {"No contributions yet"}
          </div>
        </div>
      )}
    </div>
  );
}
