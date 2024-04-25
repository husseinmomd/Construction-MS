import { FunctionComponent, useEffect, useState } from "react";
import { AssetForm, CustomPageStarter, PageHeading } from "../components";
import { Asset, Category } from "../core";
import { useLocation, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { AssetServices } from "../services";

interface AddAssetProps {
  path: string;
}

interface LocationProp {
  state: {
    item: Asset | null;
  };
  pathname: string;
}

const AddAsset: FunctionComponent<AddAssetProps> = ({ path }) => {
  const navigate = useNavigate();
  const { state } = useLocation() as LocationProp;

  const [categories, setCategories] = useState<Category[]>([]);

  async function getCategories() {
    try {
      const res = await new AssetServices().getCategories();
      setCategories(res);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    (async () => {
      await getCategories();
    })();
  }, []);

  return (
    <CustomPageStarter>
      {path === "edit" ? (
        <div className="pb-3" style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={() => navigate("..")}
            className="btn outline-badge-primary"
          >
            <BiArrowBack />
          </button>
          <PageHeading
            title={path !== "edit" ? "Create Asset" : "Edit Asset"}
          />
        </div>
      ) : (
        <div className="pb-3" style={{ display: "flex", gap: "10px" }}>
          <PageHeading title={"Create Asset"} />
        </div>
      )}

      {/* form */}
      <div className="w-50">
        <AssetForm
          asset={state?.item}
          path={path ?? "add"}
          categories={categories}
        />
      </div>
    </CustomPageStarter>
  );
};

export default AddAsset;
