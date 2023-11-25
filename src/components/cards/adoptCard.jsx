import PropTypes from "prop-types";

export function AdoptCard({ pet, hasBtn, btnLabel, hasStatus, clickFn }) {
  return (
    <div className="bg-base-300 p-3 rounded shadow-md flex flex-col gap-2">
      <p>Name: {pet.petName}</p>
      <p>Age: {pet.petAge}</p>
      <p>Type: {pet.petType}</p>
      <p>Gender: {pet.petGender}</p>
      {hasStatus && <p>Status: {pet.adopted ? "Adpoted" : "Available"}</p>}
      <div>
        <img
          src={pet.petImageUrl}
          className="object-cover h-64 w-64 rounded"
          alt="petImg"
        />
      </div>
      {hasBtn && (
        <button
          className="btn btn-accent"
          onClick={() => {
            clickFn(pet.id);
          }}
        >
          {btnLabel}
        </button>
      )}
    </div>
  );
}

AdoptCard.propTypes = {
  pet: PropTypes.object,
  hasBtn: PropTypes.bool,
  btnLabel: PropTypes.string,
  hasStatus: PropTypes.bool,
  clickFn: PropTypes.func,
};
