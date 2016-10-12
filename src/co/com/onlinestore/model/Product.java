package co.com.onlinestore.model;

import java.util.List;

public class Product {

	private String code = "";
	private String reference = "";
	private String modalId = "";
	private String image = "";
	private String name = "";
	private String headerDescription = "";
	private String price = "";
	private String category = "";
	private String subCategory = "";
	private String itemCategory = "";
	private List<ProductSize> sizes;
	private String collection;

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getReference() {
		return reference;
	}

	public void setReference(String reference) {
		this.reference = reference;
	}

	public String getModalId() {
		return modalId;
	}

	public void setModalId(String modalId) {
		this.modalId = modalId;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getHeaderDescription() {
		return headerDescription;
	}

	public void setHeaderDescription(String headerDescription) {
		this.headerDescription = headerDescription;
	}

	public String getPrice() {
		return price;
	}

	public void setPrice(String price) {
		this.price = price;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getSubCategory() {
		return subCategory;
	}

	public void setSubCategory(String subCategory) {
		this.subCategory = subCategory;
	}

	public String getItemCategory() {
		return itemCategory;
	}

	public void setItemCategory(String itemCategory) {
		this.itemCategory = itemCategory;
	}

	public List<ProductSize> getSizes() {
		return sizes;
	}

	public void setSizes(List<ProductSize> sizes) {
		this.sizes = sizes;
	}

	public String getCollection() {
		return collection;
	}

	public void setCollection(String collection) {
		this.collection = collection;
	}
}
