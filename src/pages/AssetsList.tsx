import { FunctionComponent, useEffect, useState } from "react";
import {
  CustomPageStarter,
  DangerBadge,
  DeleteBadge,
  EditBadge,
  MyBarLoader,
  PageHeading,
  SearchBar,
  SuccessBadge,
  TableHelmet,
} from "../components";
import { AssetServices } from "../services";
import { Asset, Category } from "../core";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

interface AssetsListProps {}

const AssetsList: FunctionComponent<AssetsListProps> = () => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isFetching, setIsFetching] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | "All">(
    "All"
  );

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCategory(event.target.value);
  };

  useEffect(() => {
    (async () => {
      setIsFetching(true);
      const assetRes = await new AssetServices().getAll();
      const categories = await new AssetServices().getCategories();
      setCategories(categories);

      // filtered list
      const filteredAssets =
        selectedCategory === "All"
          ? assetRes
          : assetRes.filter((a) => a.categoryId === selectedCategory);

      setAssets(filteredAssets);
      setIsFetching(false);
    })();
  }, [selectedCategory]);

  function onDelete(id: string) {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const assetServices = new AssetServices();
          const res = await assetServices.delete(id);
          setIsFetching(true);
          const assets = await new AssetServices().getAll();
          setAssets(assets);
          setIsFetching(false);
          console.log(res);
          Swal.fire("Deleted!", "asset has been deleted.", "success");
        }
      });
    } catch (error) {}
  }

  const navigate = useNavigate();
  return (
    <>
      <TableHelmet />
      <CustomPageStarter>
        <div style={{}}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <PageHeading title="Asset List" />
            <a
              onClick={() => navigate("add")}
              className="btn outline-badge-info"
            >
              Create Asset
            </a>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              paddingTop: "20px",
              paddingBottom: "20px",
            }}
          >
            {/* search bar */}
            <SearchBar
              query={searchQuery}
              setQuery={setSearchQuery}
              placeholder="Search Assets"
            />
            <div>
              <select
                id="selectedCategory"
                onChange={handleCategoryChange}
                value={selectedCategory}
                className="form-control"
              >
                <option value="All">All</option>
                {categories?.map((c) => (
                  <option value={c.id} key={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        {/* table */}
        {isFetching ? (
          <MyBarLoader />
        ) : (
          <table className="table table-bordered table-hover table-condensed mb-4">
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Description</th>
                <th>Cost</th>
                <th>Stock</th>
                <th>In Stock</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            {!assets.length ? (
              <div>no data</div>
            ) : (
              assets
                .filter((e) =>
                  e.name.toLowerCase().includes(searchQuery.toLocaleLowerCase())
                )
                ?.map((asset) => (
                  <tbody>
                    <tr key={asset.id}>
                      <td>{asset.name}</td>
                      <td>
                        {
                          categories?.find((c) => c.id === asset.categoryId)
                            ?.name
                        }
                      </td>
                      <td>{asset.description}</td>
                      <td>$ {asset.cost.toFixed(2)}</td>
                      <td> {asset.stock}</td>
                      <td>
                        {" "}
                        {asset.inStock ? (
                          <SuccessBadge text="In Stock" />
                        ) : (
                          <DangerBadge text="Out Of Stock" />
                        )}
                      </td>
                      <td className="text-center">
                        <ul className="table-controls">
                          <li>
                            <EditBadge
                              callback={() =>
                                navigate("edit", {
                                  state: { item: asset },
                                })
                              }
                            />
                          </li>
                          <li>
                            <DeleteBadge callback={() => onDelete(asset.id!)} />
                          </li>
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                ))
            )}
          </table>
        )}
      </CustomPageStarter>
    </>
  );
};

export default AssetsList;
