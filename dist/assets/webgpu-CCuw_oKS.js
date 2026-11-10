import{S as $,w as pt,a as v,T as Fa,N as Pa,F as Ls,C as ks,u as Pe,f as ce,m as Es,s as _,b as I,M as gt,t as te,c as pe,v as xt,d as Ge,e as w,g as zs,h as ri,i as Hs,j as Os,k as Gt,l as j,n as W,P as fe,Q as ii,o as Ht,I as si,p as sr,q as Vs,r as Ws,x as Us,y as qs,z as js,A as Gs,B as nr,D as Qs,E as or,G as Ks}from"./three.webgpu-BVZoFFun.js";import{G as Ta,S as lr,V as H,E as Xs,M as N,R as Ys,F as ni,B as oi,T as Ye,a as V,N as nt,I as cr,b as li,c as Qt,d as Zs,e as De,f as Js,g as ci,U as ue,L as en,h as ui,i as tn,j as an,k as di,l as Ze,m as St,n as rn,o as dt,p as Ot,q as ot,r as ae,H as G,s as hi,t as fi,u as Be,C as sn,D as K,v as ht,w as nn,x as Ia,y as se,z as O,A as be,J as Vt,K as on,O as mi,P as pi,Q as ln,W as Kt,X as gi,Y as cn,Z as un,_ as He,$ as dn,a0 as hn,a1 as xi,a2 as fn,a3 as mn,a4 as pn,a5 as rt,a6 as gn,a7 as xn,a8 as _a,a9 as vi,aa as vn,ab as yn,ac as yi,ad as Ba,ae as bn,af as wn,ag as Sn}from"./index-pd4Ch7Ec.js";const ur=new H,dr=new H,hr=new H,he=new Ys,fr=new N,Te=new H,la=new H,Tn=["x","y","z"],Tt=parseInt(li)>=169,In=parseInt(li)<=161,It=new V,_t=new V,Rt=new V,mr=new H,pr=new H,gr=new H;class lt extends Ta{get primitiveStride(){return 3}constructor(e,t={}){if(!e.isMesh)throw new Error("SkinnedMeshBVH: First argument must be a Mesh.");super(e.geometry,{...t,[lr]:!0}),this.mesh=e,t[lr]||this.init(t)}writePrimitiveBounds(e,t,a){const{mesh:r,geometry:s}=this,i=this._indirectBuffer,o=s.index?s.index.array:null,u=(i?i[e]:e)*3;let n=u+0,h=u+1,f=u+2;o&&(n=o[n],h=o[h],f=o[f]),r.getVertexPosition(n,ur),r.getVertexPosition(h,dr),r.getVertexPosition(f,hr);for(let p=0;p<3;p++){const d=Tn[p],g=ur[d],x=dr[d],y=hr[d];let b=g;x<b&&(b=x),y<b&&(b=y);let T=g;x>T&&(T=x),y>T&&(T=y),t[a+p]=b,t[a+p+3]=T}return t}shapecast(e){const t=new Xs;return super.shapecast({...e,intersectsPrimitive:e.intersectsTriangle,scratchPrimitive:t,iterate:_n})}raycastObject3D(e,t,a=[]){const{material:r}=e;if(r===void 0)return;const{matrixWorld:s}=e,{firstHitOnly:i}=t;fr.copy(s).invert(),he.copy(t.ray).applyMatrix4(fr);let o=null,l=1/0;return this.shapecast({boundsTraverseOrder:u=>u.distanceToPoint(he.origin),intersectsBounds:u=>{if(i){if(!he.intersectBox(u,la))return nt;let n;return u.containsPoint(he.origin)?n=0:(la.applyMatrix4(s),n=t.ray.origin.distanceTo(la)),n<l?cr:nt}else return he.intersectsBox(u)?cr:nt},intersectsTriangle:(u,n)=>{let h=null;if(r.side===ni?h=he.intersectTriangle(u.a,u.b,u.c,!0,Te):r.side===oi?h=he.intersectTriangle(u.c,u.b,u.a,!0,Te):h=he.intersectTriangle(u.a,u.b,u.c,!1,Te),!h)return;h=h.clone().applyMatrix4(s);const f=t.ray.origin.distanceTo(h);if(f>=t.near&&f<=t.far){if(i&&f>=l)return;const{geometry:p}=this,{index:d}=p,g=this.resolvePrimitiveIndex(n),x=g*3;let y=x+0,b=x+1,T=x+2;d&&(y=d.array[y],b=d.array[b],T=d.array[T]);const S={distance:f,point:h.clone(),object:e,uv:null,uv1:null,normal:null,face:{a:y,b,c:T,normal:Ye.getNormal(u.a,u.b,u.c,new H),materialIndex:0},faceIndex:g};if(Tt){const A=new H;Ye.getBarycoord(Te,u.a,u.b,u.c,A),S.barycoord=A}const C=p.attributes.uv,P=p.attributes.uv1,F=p.attributes.normal;if(C){It.fromBufferAttribute(C,y),_t.fromBufferAttribute(C,b),Rt.fromBufferAttribute(C,T),S.uv=new V;const A=Ye.getInterpolation(Te,u.a,u.b,u.c,It,_t,Rt,S.uv);Tt||(S.uv=A)}if(P){It.fromBufferAttribute(P,y),_t.fromBufferAttribute(P,b),Rt.fromBufferAttribute(P,T),S.uv1=new V;const A=Ye.getInterpolation(Te,u.a,u.b,u.c,It,_t,Rt,S.uv1);Tt||(S.uv1=A),In&&(S.uv2=S.uv1)}if(F){mr.fromBufferAttribute(F,y),pr.fromBufferAttribute(F,b),gr.fromBufferAttribute(F,T),S.normal=new H;const A=Ye.getInterpolation(Te,u.a,u.b,u.c,mr,pr,gr,S.normal);S.normal.dot(he.direction)>0&&S.normal.multiplyScalar(-1),Tt||(S.normal=A)}l=S.distance,o=S,i||a.push(S)}}}),i&&o&&a.push(o),a}}function _n(c,e,t,a,r,s,i){const{mesh:o,geometry:l}=t,u=l.index?l.index.array:null;for(let n=c,h=e+c;n<h;n++){const f=t.resolvePrimitiveIndex(n);let p=3*f+0,d=3*f+1,g=3*f+2;if(u&&(p=u[p],d=u[d],g=u[g]),o.getVertexPosition(p,i.a),o.getVertexPosition(d,i.b),o.getVertexPosition(g,i.c),i.needsUpdate=!0,a(i,n,r,s))return!0}return!1}const ge=new $({min:"array<f32, 3>",max:"array<f32, 3>"},"BVHBoundingBox");ge.getLength=()=>6;const Ne=new $({leftBounds:"BVHBoundingBox",rightBounds:"BVHBoundingBox",rightChildOrTriangleOffset:"uint",splitAxisOrTriangleCount:"uint",_alignment0:"uint",_alignment1:"uint"},"BVHNode");Ne.getLength=()=>2*ge.getLength()+4;const Rn=new $({matrixWorld:"mat4x4f",inverseMatrixWorld:"mat4x4f",visible:"uint",_alignment0:"uint",_alignment1:"uint",_alignment2:"uint"},"TransformStruct"),R=new $({origin:"vec3f",direction:"vec3f",maxDist:"float"},"Ray"),Oe=new $({indices:"vec4u",normal:"vec3f",didHit:"bool",barycoord:"vec3f",objectIndex:"uint",side:"float",dist:"float"},"IntersectionResult"),Ct=new $({faceIndices:"vec4u",closestPoint:"vec3f",found:"bool",barycoord:"vec3f",objectIndex:"uint",faceNormal:"vec3f",side:"float",distanceSq:"float"},"PointQueryResult"),Na=pt(`

	const BVH_STACK_DEPTH = 60u;
	const INFINITY = 1e20;
	const TRI_INTERSECT_EPSILON = 1e-5;

`),Aa=pt(`
	struct IntersectionResult {
		indices: vec4u,
		normal: vec3f,
		didHit: bool,
		barycoord: vec3f,
		side: f32,
		dist: f32,
	};
`);v(`

	fn getVertexAttribute(
		barycoord: vec3f,
		indices: vec3u,
		attributeBuffer: ptr<storage, array<vec3f>, read>
	) -> vec3f {

		let n0 = attributeBuffer[ indices.x ];
		let n1 = attributeBuffer[ indices.y ];
		let n2 = attributeBuffer[ indices.z ];
		return barycoord.x * n0 + barycoord.y * n1 + barycoord.z * n2;

	}

`);const Cn=v(`

	fn intersectsBounds(
		ray: Ray,
		bounds: BVHBoundingBox,
		dist: ptr<function, f32>
	) -> bool {

		let boundsMin = vec3( bounds.min[0], bounds.min[1], bounds.min[2] );
		let boundsMax = vec3( bounds.max[0], bounds.max[1], bounds.max[2] );

		let invDir = 1.0 / ray.direction;
		let tMinPlane = ( boundsMin - ray.origin ) * invDir;
		let tMaxPlane = ( boundsMax - ray.origin ) * invDir;

		let tMinHit = vec3f(
			min( tMinPlane.x, tMaxPlane.x ),
			min( tMinPlane.y, tMaxPlane.y ),
			min( tMinPlane.z, tMaxPlane.z )
		);

		let tMaxHit = vec3f(
			max( tMinPlane.x, tMaxPlane.x ),
			max( tMinPlane.y, tMaxPlane.y ),
			max( tMinPlane.z, tMaxPlane.z )
		);

		let t0 = max( max( tMinHit.x, tMinHit.y ), tMinHit.z );
		let t1 = min( min( tMaxHit.x, tMaxHit.y ), tMaxHit.z );

		( *dist ) = max( t0, 0.0 );

		return t1 >= ( *dist );

	}

`,[R,ge]),bi=v(`

	fn intersectsTriangle( ray: Ray, a: vec3f, b: vec3f, c: vec3f ) -> IntersectionResult {

		var result: IntersectionResult;
		result.didHit = false;

		let edge1 = b - a;
		let edge2 = c - a;
		let n = cross( edge1, edge2 );

		let det = - dot( ray.direction, n );

		if ( abs( det ) < TRI_INTERSECT_EPSILON ) {

			return result;

		}

		let invdet = 1.0 / det;

		let AO = ray.origin - a;
		let DAO = cross( AO, ray.direction );

		let u = dot( edge2, DAO ) * invdet;
		let v = -dot( edge1, DAO ) * invdet;
		let t = dot( AO, n ) * invdet;

		let w = 1.0 - u - v;

		if ( u < - TRI_INTERSECT_EPSILON || v < - TRI_INTERSECT_EPSILON || w < - TRI_INTERSECT_EPSILON || t < TRI_INTERSECT_EPSILON ) {

			return result;

		}

		result.didHit = true;
		result.barycoord = vec3f( w, u, v );
		result.dist = t;
		result.side = sign( det );
		result.normal = result.side * normalize( n );

		return result;

	}

`,[R,Aa,Na]),Dn=v(`

	fn intersectTriangles(
		bvh_position: ptr<storage, array<vec3f>, read>,
		bvh_index: ptr<storage, array<vec3u>, read>,
		offset: u32,
		count: u32,
		ray: Ray
	) -> IntersectionResult {

		var closestResult: IntersectionResult;

		closestResult.didHit = false;
		closestResult.dist = INFINITY;

		for ( var i = offset; i < offset + count; i = i + 1u ) {

			let indices = bvh_index[ i ];
			let a = bvh_position[ indices.x ];
			let b = bvh_position[ indices.y ];
			let c = bvh_position[ indices.z ];

			var triResult = intersectsTriangle( ray, a, b, c );

			if ( triResult.didHit && triResult.dist < closestResult.dist ) {

				closestResult = triResult;
				closestResult.indices = vec4u( indices.xyz, i );

			}

		}

		return closestResult;

	}

`,[bi,R,Aa,Na]);v(`

	fn bvhIntersectFirstHit(
		bvh_index: ptr<storage, array<vec3u>, read>,
		bvh_position: ptr<storage, array<vec3f>, read>,
		bvh: ptr<storage, array<BVHNode>,read>,
		ray: Ray,
	) -> IntersectionResult {

		var pointer = 0;
		var stack: array<u32, BVH_STACK_DEPTH>;
		stack[ 0 ] = 0u;

		var bestHit: IntersectionResult;

		bestHit.didHit = false;
		bestHit.dist = INFINITY;

		loop {

			if ( pointer < 0 || pointer >= i32( BVH_STACK_DEPTH ) ) {

				break;

			}

			let currNodeIndex = stack[ pointer ];
			let node = bvh[ currNodeIndex ];

			pointer = pointer - 1;

			var boundsHitDistance: f32 = 0.0;

			if ( ! intersectsBounds( ray, node.bounds, &boundsHitDistance ) || boundsHitDistance > bestHit.dist ) {

				continue;

			}

			let boundsInfox = node.splitAxisOrTriangleCount;
			let boundsInfoy = node.rightChildOrTriangleOffset;

			let isLeaf = ( boundsInfox & 0xffff0000u ) != 0u;

			if ( isLeaf ) {

				let count = boundsInfox & 0x0000ffffu;
				let offset = boundsInfoy;

				let localHit = intersectTriangles(
					bvh_position, bvh_index, offset,
					count, ray
				);

				if ( localHit.didHit && localHit.dist < bestHit.dist ) {

					bestHit = localHit;

				}

			} else {

				let leftIndex = currNodeIndex + 1u;
				let splitAxis = boundsInfox & 0x0000ffffu;
				let rightIndex = currNodeIndex + boundsInfoy;

				let leftToRight = ray.direction[splitAxis] >= 0.0;
				let c1 = select( rightIndex, leftIndex, leftToRight );
				let c2 = select( leftIndex, rightIndex, leftToRight );

				pointer = pointer + 1;
				stack[ pointer ] = c2;

				pointer = pointer + 1;
				stack[ pointer ] = c1;

			}

		}

		return bestHit;

	}

`,[Dn,Cn,R,Ne,Aa,Na]);class wi extends Pa{static get type(){return"ProxyCallNode"}constructor(e,t){super(),this.proxyNode=e,this.params=t}setup(){return this.proxyNode.proxyNode.call(...this.params)}}class La{get isNode(){return!0}get proxyNode(){const{proxyObject:e,proxyProperty:t}=this,a=t.split(".");let r=e;for(let s=0,i=a.length;s<i;s++)r=r==null?void 0:r[a[s]];return r&&"functionNode"in r?r.functionNode:r??null}constructor(e,t=null){return this.proxyObject=t,this.proxyProperty=e,new Proxy(this,{get(a,r){if(r in a)return Reflect.get(a,r);{const s=a.proxyNode;if(!s)return;const i=Reflect.get(s,r);return typeof i=="function"?i.bind(s):i}},set(a,r,s){if(r in a)return Reflect.set(a,r,s);throw new Error("NodeProxy: Cannot set members of proxied nodes.")}})}}const L=(...c)=>new La(...c),B=(...c)=>{const e=new La(...c),t=(...a)=>new wi(e,a);return Fa.nodeProxyConstructor(t,e)};class Si extends La{get proxyNode(){return super.proxyNode||this.fallbackNode}constructor(e,t){super(e,null),Object.defineProperty(this,"fallbackNode",{value:t})}setup(e){return this.proxyObject=e.getContext(),this.proxyNode.setup(e)}}const ee=(...c)=>new Si(...c),q=(...c)=>{const e=new Si(...c),t=(...a)=>new wi(e,a);return Fa.nodeProxyConstructor(t,e)},Ra=64,Ti=Ra/4,xe=new De,re=new De;function xr(c,e,t,a){const r=e*ue;for(let s=0;s<3;s++){const i=c[r+s],o=c[r+s+3];i>o?(t[a+s]=1,t[a+s+3]=-1):(t[a+s]=i,t[a+s+3]=o)}}function Ii(c,e,t,a,r){const s=t*ue;xr(c,t+1,a,r),xr(c,t+e[s+6],a,r+6)}function $n(c,e){const t=c?c.array:null,a=new Uint32Array(e.length*3);for(let r=0,s=e.length;r<s;r++){const i=3*r,o=3*e[r];for(let l=0;l<3;l++)a[i+l]=t?t[o+l]:o+l}return a}function vr(c,e,t,a){const r=new Uint32Array(a),s=new Float32Array(a);c._roots.forEach(i=>{const o=new Uint16Array(i),l=new Uint32Array(i),u=new Float32Array(i);for(let n=0,h=i.byteLength/ci;n<h;n++){const f=n*ue,p=f*2,d=t*Ti,g=Qt(p,o);if(g||Ii(u,l,n,s,d),e===null){t++;continue}if(g){const x=l[f+6],y=o[p+14],{transformSlot:b,nodeOffset:T}=y===0?{transformSlot:0,nodeOffset:0}:e[x];if(b>16777215)throw new Error(`packBVHBufferUtils: transform slot ${b} exceeds the 24-bit TLAS leaf limit.`);r[d+12]=T,r[d+13]=4278190080|b&16777215}else r[d+12]=l[f+6],r[d+13]=l[f+7];t++}})}function Mn(c,e){return _i(new Uint16Array(c),new Uint32Array(c),e)}function _i(c,e,t){if(Qt(t*ue*2,c))return 1;const r=e[t*ue+6];return r+_i(c,e,t+r)}function yr(c,e=0){const t=new Uint16Array(c),a=new Uint32Array(c);let r=0;return s(e*ue,1),r;function s(i,o){const l=i,u=i*2;if(Qt(u,t))r=Math.max(o,r);else{const h=Zs(l,a),f=en(l);s(f,o+1),s(h,o+1)}}}function Fn(c,e,t,a,r,s){const i=new Uint16Array(s),o=new Uint32Array(s),l=new Float32Array(s),u=new Uint16Array(c),n=new Uint32Array(c),h=new Float32Array(c);for(let f=0;f<t;f++){const p=e+f,d=p*ue,g=d*2,x=r*Ti,y=x*2;Qt(g,u)?(o[x+12]=n[d+6]+a,i[y+26]=u[g+14],i[y+27]=Js):(Ii(h,n,p,l,x),o[x+12]=n[d+6],o[x+13]=n[d+7]),r++}}function Pn(c,e,t,a,r){const{geometry:s}=c,{start:i,count:o,vertexStart:l}=e;if(c.indirect){const u=$n(s.index,c._indirectBuffer);for(let n=0;n<u.length;n++)r[n+a]=u[n]-l+t}else if(s.index)for(let u=0;u<o;u++)r[u+a]=s.index.getX(u+i)-l+t;else for(let u=0;u<o;u++)r[u+a]=u+i+t}function Bn(c,e,t,a,r,s){const{geometry:i,mesh:o=null}=c,{vertexStart:l,vertexCount:u}=e,n=new Float32Array(a),h=r.getLength();r.membersLayout.forEach(({name:f},p)=>{const d=i.attributes[f];s.getDefaultAttributeValue(f,xe);for(let g=0;g<u;g++){if(d){switch(re.fromBufferAttribute(d,g+l),d.itemSize){case 1:re.y=xe.y,re.z=xe.z,re.w=xe.w;break;case 2:re.z=xe.z,re.w=xe.w;break;case 3:re.w=xe.w;break}o&&(f==="position"||f==="normal"||f==="tangent")&&o.applyBoneTransform(g+l,re)}else re.copy(xe);re.toArray(n,(t+g)*h+p*4)}})}class Nn extends Pa{constructor(e){super(),this.literal=e}build(){return this.literal}}class Ca extends Pa{constructor(e,t="property"){super(),this.node=e,this.output=t}build(e){return this.node.build(e,this.output)}}function An(c){return c.isNode?new Ca(c):null}function Ri(c){const e=[];for(const t of c)if(Array.isArray(t))for(const a of t){const r=An(a);r&&e.push(r)}return e}function Ci(c,e){return c.map(t=>(t&&!t.isNode&&t instanceof Function&&(t=t(e)),t&&t.isNode?(t.setup(e),t.isWGSLTagCodeNode?new Ca(t,"inline"):new Ca(t)):t))}function Da(c,e,t){let a="";for(let r=0,s=c.length;r<s;r++)if(a+=c[r],r<e.length){const i=e[r];Array.isArray(i)||(typeof i=="string"||typeof i=="number"?a+=String(i):a+=i.build(t))}return a}class Ln extends Ls{static get type(){return"WGSLTagFnNode"}constructor(e,t,a="wgsl"){super("",Ri(t),a),this.isWGSLTagFnNode=!0,this.tokens=e,this.args=t}setup(e){super.setup(e),this._normalizedArgs=Ci(this.args,e)}getNodeFunction(e){const{tokens:t,_normalizedArgs:a}=this,r=e.getDataFromNode(this);let s=r.nodeFunction;if(s===void 0){let i="";for(let o=0,l=t.length;o<l;o++)if(i+=t[o],o<a.length){const u=a[o];Array.isArray(u)||(typeof u=="string"||typeof u=="number"?i+=String(u):u.isStructLayoutNode?i+=u.getNodeType(e):u.isStruct?i+=u.layout.getNodeType(e):i+="_arg"+o)}i=i.replace(/\/\/.*[\n\r]/g,""),s=e.parser.parseFunction(i),r.nodeFunction=s}return s}generate(e,t){const a=super.generate(e,t),{_normalizedArgs:r}=this,s=Da(this.tokens,r,e),{type:i}=this.getNodeFunction(e),o=e.getCodeFromNode(this,i);return o.code=s.replace(/\/\/.+[\n\r]/g,"").replace(/->\s*void/,"").trim(),a}}class kn extends ks{static get type(){return"WGSLTagCodeNode"}constructor(e,t,a="wgsl"){super("",Ri(t),a),this.isWGSLTagCodeNode=!0,this.tokens=e,this.args=t}setup(e){super.setup(e),this._normalizedArgs=Ci(this.args,e)}build(e,t){return t==="inline"?Da(this.tokens,this._normalizedArgs,e):super.build(e,t)}generate(e){super.generate(e);const t=e.getCodeFromNode(this,this.getNodeType(e));return t.code=Da(this.tokens,this._normalizedArgs,e),t.code}}const En=c=>{const e=(...t)=>{if(t.length===1&&t[0]&&typeof t[0]=="object"&&!t[0].isNode){const a=t[0];for(const r in a)typeof a[r]=="string"&&(a[r]=new Nn(a[r]))}return c.call(...t)};return Fa.nodeProxyConstructor(e,c)},m=(c,...e)=>En(new Ln(c,e)),Ee=(c,...e)=>new kn(c,e),$a=Pe(60);function zn(c,e){const{name:t=`bvh_shapecast_fn_${Math.random().toString(36).substring(2,7)}`,shapeStruct:a,resultStruct:r=null,prefixFn:s=null,boundsOrderFn:i=null,intersectsBoundsFn:o,intersectRangeFn:l,transformShapeFn:u=null,transformResultFn:n=null,resetShapeFn:h=null}=e,{nodes:f,transforms:p}=c.storage;let d="";s&&(d=Ee`${s}();`);let g="";n&&(g=Ee`${n}( result, objectIndex );`);let x="";u&&(x=Ee`${u}( &localShape, objectIndex );`);let y="";h&&(y=Ee`${h}( objectIndex );`);let b="";i&&(b=Ee`
			let leftToRight = ${i}( localShape, splitAxis, node );
			c1 = select( rightIndex, leftIndex, leftToRight );
			c2 = select( leftIndex, rightIndex, leftToRight );
			hit1 = select( hitRight, hitLeft, leftToRight );
			hit2 = select( hitLeft, hitRight, leftToRight );
		`);const T=r?Ee`result: ptr<function, ${r}>`:"",S=r?"result":"",C=m`
		// fn
		fn ${t}( shape: ${a}, ${T} ) -> bool {

			${d}

			var didHit = false;

			var isTLAS = true;
			var pointer: i32 = 0;
			var stack: array<u32, ${$a}>;
			stack[ 0 ] = 0u;

			var blasDidHit: bool = false;
			var objectIndex: u32 = 0;
			var localShape: ${a} = shape;

			// the stack depth the current cluster's BLAS drains back down to once it is complete
			var tlasReset: i32 = 0;

			loop {

				// The cluster's BLAS has drained back to its TLAS leaf. Finalize the cluster that
				// was just traversed and resume the TLAS.
				if ( ! isTLAS && tlasReset == pointer ) {

					if ( blasDidHit ) {

						blasDidHit = false;
						didHit = true;
						${g}

					}

					${y}

					objectIndex = 0;
					isTLAS = true;
					localShape = shape;

				}

				// check if we've finished all nodes on the stack (or overrun the stack)
				if ( pointer < 0 || pointer >= i32( ${$a} ) ) {

					break;

				}

				// a node's bounds were tested by its parent, so the popped node is always entered
				let nodeIndex = stack[ pointer ];
				let node = ${f}[ nodeIndex ];
				pointer = pointer - 1;

				let infoX = node.splitAxisOrTriangleCount;
				let infoY = node.rightChildOrTriangleOffset;
				let isLeaf = ( infoX & 0xffff0000u ) != 0u;

				if ( isLeaf ) {

					if ( isTLAS ) {

						// the leaf encodes the placement / transform slot in the low 24 bits of infoX
						// and the cluster subtree's absolute node offset in infoY, which is pushed
						// directly as the BLAS entry node. Each TLAS leaf references one cluster.
						objectIndex = infoX & 0x00ffffffu;

						let transform = ${p}[ objectIndex ];
						if ( transform.visible != 0u ) {

							tlasReset = pointer;
							isTLAS = false;
							blasDidHit = false;

							// Transform shape into object local space
							localShape = shape;
							${x}

							pointer = pointer + 1;
							stack[ pointer ] = infoY;

						}

					} else {

						let count = infoX & 0x0000ffffu;
						let offset = infoY;
						// Cast bool callbacks to u32 to preserve their existing hit / miss behavior.
						let rangeResult = u32( ${l}( localShape, offset, count, ${S} ) );
						blasDidHit = rangeResult != ${nt}u || blasDidHit;
						if ( rangeResult == ${ui}u ) {

							${g}
							${y}
							return true;

						}

					}

				} else {

					// test both children here, pushing the farther one first so the nearer is popped next
					let leftIndex = nodeIndex + 1u;
					let splitAxis = infoX & 0x0000ffffu;
					let rightIndex = nodeIndex + infoY;
					let hitLeft = ${o}( localShape, node.leftBounds, ${S} ) != 0u;
					let hitRight = ${o}( localShape, node.rightBounds, ${S} ) != 0u;

					var c1 = rightIndex;
					var c2 = leftIndex;
					var hit1 = hitRight;
					var hit2 = hitLeft;
					${b}

					if ( hit2 ) {

						pointer = pointer + 1;
						stack[ pointer ] = c2;

					}

					if ( hit1 ) {

						pointer = pointer + 1;
						stack[ pointer ] = c1;

					}

				}

			}

			return didHit;

		}
	`;return C.outputType=r,C.functionName=t,C}const Hn=m`
	// fn
	fn closestPointToTriangle(
		p: vec3f,
		v0: vec3f,
		v1: vec3f,
		v2: vec3f
	) -> vec3f {

		let v10 = v1 - v0;
		let v21 = v2 - v1;
		let v02 = v0 - v2;
		let p0 = p - v0;
		let p1 = p - v1;
		let p2 = p - v2;

		let nor = cross( v10, v02 );
		let q = cross( nor, p0 );
		let d = 1.0 / dot( nor, nor );
		var u = d * dot( q, v02 );
		var v = d * dot( q, v10 );
		var w = 1.0 - u - v;

		if ( u < 0.0 ) {

			w = clamp( dot( p2, v02 ) / dot( v02, v02 ), 0.0, 1.0 );
			u = 0.0;
			v = 1.0 - w;

		} else if ( v < 0.0 ) {

			u = clamp( dot( p0, v10 ) / dot( v10, v10 ), 0.0, 1.0 );
			v = 0.0;
			w = 1.0 - u;

		} else if ( w < 0.0 ) {

			v = clamp( dot( p1, v21 ) / dot( v21, v21 ), 0.0, 1.0 );
			w = 0.0;
			u = 1.0 - v;

		}

		return vec3f( w, u, v );

	}
`,ka=m`
	// fn
	fn intersectRayTriangle( ray: ${R}, a: vec3f, b: vec3f, c: vec3f, threshold: f32 ) -> ${Oe} {

		const DET_EPSILON = 1e-15;

		var result: ${Oe};
		result.didHit = false;

		let edge1 = b - a;
		let edge2 = c - a;
		let n = cross( edge1, edge2 );

		let det = - dot( ray.direction, n );
		if ( abs( det ) < DET_EPSILON ) {

			return result;

		}

		let invdet = 1.0 / det;

		let AO = ray.origin - a;
		let DAO = cross( AO, ray.direction );

		let u = dot( edge2, DAO ) * invdet;
		if ( u < 0.0 || u > 1.0 ) {

			return result;

		}

		let v = - dot( edge1, DAO ) * invdet;
		if ( v < 0.0 || u + v > 1.0 ) {

			return result;

		}

		let t = dot( AO, n ) * invdet;
		let w = 1.0 - u - v;
		if ( t < threshold ) {

			return result;

		}

		result.didHit = true;
		result.barycoord = vec3f( w, u, v );
		result.dist = t;
		result.side = sign( det );
		result.normal = result.side * normalize( n );

		return result;

	}
`,Xt=m`
	// fn
	fn ndcToCameraRay( ndc: vec2f, inverseModelViewProjection: mat4x4f ) -> ${R} {

		var homogeneous = vec4f();
		var ray: ${R};

		homogeneous = inverseModelViewProjection * vec4f( ndc, 0.0, 1.0 );
		ray.origin = homogeneous.xyz / homogeneous.w;

		homogeneous = inverseModelViewProjection * vec4f( ndc, 1.0, 1.0 );
		let toFarPlane = ( homogeneous.xyz / homogeneous.w ) - ray.origin;
		ray.maxDist = length( toFarPlane );
		ray.direction = toFarPlane / ray.maxDist;

		return ray;

	}
`,Di=m`
	fn bvh_rayBoundsDistance( ray: ${R}, bounds: ${ge} ) -> f32 {

		let boundsMin = vec3( bounds.min[0], bounds.min[1], bounds.min[2] );
		let boundsMax = vec3( bounds.max[0], bounds.max[1], bounds.max[2] );

		// Avoid 0 * infinity for rays parallel to a slab and on its boundary.
		let parallel = ray.direction == vec3f( 0.0 );
		if ( any( parallel & ( ( ray.origin < boundsMin ) | ( ray.origin > boundsMax ) ) ) ) {

			return - 1.0;

		}

		let invDir = 1.0 / select( ray.direction, vec3f( 1.0 ), parallel );
		let tMinPlane = ( boundsMin - ray.origin ) * invDir;
		let tMaxPlane = ( boundsMax - ray.origin ) * invDir;

		// parallel axes never limit the slab interval
		const FLT_MAX = 3.402823e38;
		let tMinHit = select( min( tMinPlane, tMaxPlane ), vec3f( - FLT_MAX ), parallel );
		let tMaxHit = select( max( tMinPlane, tMaxPlane ), vec3f( FLT_MAX ), parallel );

		let t0 = max( max( tMinHit.x, tMinHit.y ), tMinHit.z );
		let t1 = min( min( tMaxHit.x, tMaxHit.y ), tMaxHit.z );

		let dist = max( t0, 0.0 );
		return select( dist, - 1.0, t1 < dist );

	}
`;function On(c){const{index:e,attributes:t,transforms:a}=c.storage,r=ce(1).toVar("bvh_rayScalarAnyHit");return c.getShapecastFn({name:"bvh_RaycastAnyHit",shapeStruct:R,intersectsBoundsFn:m`
			fn rayIntersectsBoundsAnyHit( ray: ${R}, bounds: ${ge} ) -> u32 {

				let dist = ${Di}( ray, bounds ) * ${r};
				return u32( dist >= 0.0 && ( ray.maxDist <= 0.0 || dist < ray.maxDist ) );

			}
		`,intersectRangeFn:m`
			fn intersectRangeAnyHit( ray: ${R}, offset: u32, count: u32 ) -> u32 {

				for ( var ti = offset; ti < offset + count; ti = ti + 1u ) {

					let a = ${t}[ ${e}[ ti * 3u ] ].position.xyz;
					let b = ${t}[ ${e}[ ti * 3u + 1u ] ].position.xyz;
					let c = ${t}[ ${e}[ ti * 3u + 2u ] ].position.xyz;

					let triResult = ${ka}( ray, a, b, c, 0.0 );
					if ( triResult.didHit && ( ray.maxDist <= 0.0 || triResult.dist * ${r} < ray.maxDist ) ) {

						return ${ui}u;

					}

				}

				return ${nt}u;

			}
		`,transformShapeFn:m`
			fn transformRayAnyHit( ray: ptr<function, ${R}>, objectIndex: u32 ) -> void {

				let toLocal = ${a}[ objectIndex ].inverseMatrixWorld;
				ray.origin = ( toLocal * vec4f( ray.origin, 1.0 ) ).xyz;
				ray.direction = ( toLocal * vec4f( ray.direction, 0.0 ) ).xyz;

				let len = length( ray.direction );
				ray.direction /= len;
				${r} = 1.0 / len;

			}
		`,resetShapeFn:m`
			fn resetRayScalarAnyHit( objectIndex: u32 ) -> void {

				${r} = 1.0;

			}
		`})}function Vn(c){const{index:e,attributes:t,transforms:a}=c.storage,r=ce(1).toVar("bvh_rayScalar");return c.getShapecastFn({name:"bvh_RaycastFirstHit",shapeStruct:R,resultStruct:Oe,boundsOrderFn:m`
			fn getBoundsOrder( ray: ${R}, splitAxis: u32, node: ${Ne} ) -> bool {

				return ray.direction[ splitAxis ] >= 0.0;

			}
		`,intersectsBoundsFn:m`
			fn rayIntersectsBounds( ray: ${R}, bounds: ${ge}, result: ptr<function, ${Oe}> ) -> u32 {

				let dist = ${Di}( ray, bounds ) * ${r};
				if ( dist < 0.0 ) {

					return 0u;

				} else if ( ray.maxDist > 0.0 && dist >= ray.maxDist ) {

					return 0u;

				} else if ( result.didHit && dist >= result.dist ) {

					return 0u;

				} else {

					return 1u;

				}

			}

		`,intersectRangeFn:m`
			fn intersectRange( ray: ${R}, offset: u32, count: u32, result: ptr<function, ${Oe}> ) -> bool {

				var didHit = false;
				for ( var ti = offset; ti < offset + count; ti = ti + 1u ) {

					let i0 = ${e}[ ti * 3u ];
					let i1 = ${e}[ ti * 3u + 1u ];
					let i2 = ${e}[ ti * 3u + 2u ];

					let a = ${t}[ i0 ].position.xyz;
					let b = ${t}[ i1 ].position.xyz;
					let c = ${t}[ i2 ].position.xyz;

					var triResult = ${ka}( ray, a, b, c, 0.0 );
					triResult.dist *= ${r};
					if ( triResult.didHit && ( ray.maxDist <= 0.0 || triResult.dist < ray.maxDist ) && ( ! result.didHit || triResult.dist < result.dist ) ) {

						result.didHit = true;
						result.dist = triResult.dist;
						result.normal = triResult.normal;
						result.side = triResult.side;
						result.barycoord = triResult.barycoord;
						result.indices = vec4u( i0, i1, i2, ti );

						didHit = true;

					}

				}

				return didHit;

			}
		`,transformShapeFn:m`
			fn transformRay( ray: ptr<function, ${R}>, objectIndex: u32 ) -> void {

				let toLocal = ${a}[ objectIndex ].inverseMatrixWorld;
				ray.origin = ( toLocal * vec4f( ray.origin, 1.0 ) ).xyz;
				ray.direction = ( toLocal * vec4f( ray.direction, 0.0 ) ).xyz;

				let len = length( ray.direction );
				ray.direction /= len;
				${r} = 1.0 / len;

			}
		`,transformResultFn:m`
			fn transformResult( hit: ptr<function, ${Oe}>, objectIndex: u32 ) -> void {

				let toLocal = ${a}[ objectIndex ].inverseMatrixWorld;
				hit.normal = normalize( ( transpose( toLocal ) * vec4f( hit.normal, 0.0 ) ).xyz );
				hit.objectIndex = objectIndex;

			}
		`,resetShapeFn:m`
			fn resetRayScalar( objectIndex: u32 ) -> void {

				${r} = 1.0;

			}
		`})}function Wn(c){const{storage:e,structs:t}=c,a=t.attributes.membersLayout.map(({name:r})=>`result.${r} = a0.${r} * barycoord.x + a1.${r} * barycoord.y + a2.${r} * barycoord.z;`).join(`
`);return m`
		// fn
		fn bvh_sampleTrianglePoint( barycoord: vec3f, indices: vec3u ) -> ${t.attributes} {

			var result: ${t.attributes};
			var a0 = ${e.attributes}[ indices.x ];
			var a1 = ${e.attributes}[ indices.y ];
			var a2 = ${e.attributes}[ indices.z ];
			${a}
			return result;

		}
	`}function Un(c){const{index:e,attributes:t,transforms:a}=c.storage,r=Es().toVar("bvh_toWorldMat");return c.getShapecastFn({name:"bvh_ClosestPointToPoint",shapeStruct:"vec3f",resultStruct:Ct,boundsOrderFn:m`
			fn cppBoundsOrder( shape: vec3f, splitAxis: u32, node: ${Ne} ) -> bool {

				let toWorld = ${r};
				let absX = abs( toWorld[ 0 ].xyz );
				let absY = abs( toWorld[ 1 ].xyz );
				let absZ = abs( toWorld[ 2 ].xyz );

				// squared distance from the point to each child's bounds in world space
				let lMin = vec3f( node.leftBounds.min[ 0 ], node.leftBounds.min[ 1 ], node.leftBounds.min[ 2 ] );
				let lMax = vec3f( node.leftBounds.max[ 0 ], node.leftBounds.max[ 1 ], node.leftBounds.max[ 2 ] );
				let lHalf = ( lMax - lMin ) * 0.5;
				let lCenter = ( toWorld * vec4f( ( lMin + lMax ) * 0.5, 1.0 ) ).xyz;
				let lExtent = absX * lHalf.x + absY * lHalf.y + absZ * lHalf.z;
				let lDelta = shape - clamp( shape, lCenter - lExtent, lCenter + lExtent );

				let rMin = vec3f( node.rightBounds.min[ 0 ], node.rightBounds.min[ 1 ], node.rightBounds.min[ 2 ] );
				let rMax = vec3f( node.rightBounds.max[ 0 ], node.rightBounds.max[ 1 ], node.rightBounds.max[ 2 ] );
				let rHalf = ( rMax - rMin ) * 0.5;
				let rCenter = ( toWorld * vec4f( ( rMin + rMax ) * 0.5, 1.0 ) ).xyz;
				let rExtent = absX * rHalf.x + absY * rHalf.y + absZ * rHalf.z;
				let rDelta = shape - clamp( shape, rCenter - rExtent, rCenter + rExtent );

				// the nearer child is traversed first
				return dot( lDelta, lDelta ) <= dot( rDelta, rDelta );

			}
		`,intersectsBoundsFn:m`
			fn cppIntersectsBounds( shape: vec3f, bounds: ${ge}, result: ptr<function, ${Ct}> ) -> u32 {

				// return 1u;
				// we need to check this no matter what if the result has not been found yet
				if ( ! result.found ) {

					return 1u;

				}

				let toWorld = ${r};

				// transform to world space
				let bMin = vec3f( bounds.min[ 0 ], bounds.min[ 1 ], bounds.min[ 2 ] );
				let bMax = vec3f( bounds.max[ 0 ], bounds.max[ 1 ], bounds.max[ 2 ] );
				let center = ( bMin + bMax ) * 0.5;
				let halfExtent = ( bMax - bMin ) * 0.5;
				let worldCenter = ( toWorld * vec4f( center, 1.0 ) ).xyz;
				let worldHalfExtent =
					abs( toWorld[ 0 ].xyz ) * halfExtent.x +
				    abs( toWorld[ 1 ].xyz ) * halfExtent.y +
				    abs( toWorld[ 2 ].xyz ) * halfExtent.z;
				let worldMin = worldCenter - worldHalfExtent;
				let worldMax = worldCenter + worldHalfExtent;

				// intersect if the distance to the bounds is not bigger than the already found
				let d = shape - clamp( shape, worldMin, worldMax );
				return select( 0u, 1u, dot( d, d ) < result.distanceSq );

			}
		`,intersectRangeFn:m`
			fn cppIntersectsRange( shape: vec3f, offset: u32, count: u32, result: ptr<function, ${Ct}> ) -> bool {

				var didHit = false;
				let toWorld = ${r};

				for ( var i = offset; i < offset + count; i ++ ) {

					// transform the triangle to world space
					let i0 = ${e}[ i * 3u + 0u ];
					let i1 = ${e}[ i * 3u + 1u ];
					let i2 = ${e}[ i * 3u + 2u ];
					let a = ( toWorld * vec4f( ${t}[ i0 ].position.xyz, 1.0 ) ).xyz;
					let b = ( toWorld * vec4f( ${t}[ i1 ].position.xyz, 1.0 ) ).xyz;
					let c = ( toWorld * vec4f( ${t}[ i2 ].position.xyz, 1.0 ) ).xyz;

					let barycoord = ${Hn}( shape, a, b, c );
					let closestPoint = barycoord.x * a + barycoord.y * b + barycoord.z * c;
					let delta = shape - closestPoint;
					let distSq = dot( delta, delta );

					// copy the content over
					if ( ! result.found || distSq < result.distanceSq ) {

						let normal = normalize( cross( a - b, b - c ) );

						result.closestPoint = closestPoint;
						result.barycoord = barycoord;
						result.distanceSq = distSq;
						result.faceNormal = normal;
						result.side = sign( dot( normal, delta ) );
						result.faceIndices = vec4u( i0, i1, i2, i );
						result.found = true;
						didHit = true;

					}

				}

				return didHit;

			}
		`,resetShapeFn:m`
				fn cppResetShape( objectIndex: u32 ) -> void {

					// node bounds are transformed by "toWorld" during the bounds tests. Only the
					// object-local BLAS bounds need the object's world matrix - the top-level bounds
					// are already in world space - so restore identity before top-level traversal resumes.
					${r} = mat4x4f(
						1.0, 0.0, 0.0, 0.0,
						0.0, 1.0, 0.0, 0.0,
						0.0, 0.0, 1.0, 0.0,
						0.0, 0.0, 0.0, 1.0
					);

				}
			`,transformShapeFn:m`
			fn cppTransformShape( shape: ptr<function, vec3f>, objectIndex: u32 ) -> void {

				${r} = ${a}[ objectIndex ].matrixWorld;

			}
		`,transformResultFn:m`
			fn cppTransformResult( result: ptr<function, ${Ct}>, objectIndex: u32 ) -> void {

				result.objectIndex = objectIndex;

			}
		`})}const ct=24,ca=(1<<ct)-1,$i=31-ct,qn=(1<<$i)-1,ua=new N,da=new di,Je=new N;class jn extends tn{constructor(e,t){super(),t={getBVH:(i,o)=>{throw new Error("ClusteredBVH: getBVH callback must be provided ")},shouldCluster:i=>i.isSkinnedMesh||i.isInstancedMesh||i.isBatchedMesh,primitiveLimit:64,matrixWorld:Array.isArray(e)?new N:e.matrixWorld,includeInstances:!0,_strictLeafSize:1,...t};const a=Array.from(Mi(e)),r=Math.ceil(Math.log2(a.length)),s=(1<<r)-1;this.objects=a,this.getBVH=t.getBVH,this.shouldCluster=t.shouldCluster,this.includeInstances=t.includeInstances,this.primitiveLimit=t.primitiveLimit,this.matrixWorld=t.matrixWorld,this.bvhMap=new WeakMap,this.idBits=r,this.idMask=s,this.primitiveBufferStride=2,this.init(t)}init(e){let t=0;const{objects:a,bvhMap:r,matrixWorld:s}=this;ua.copy(s).invert(),a.forEach(i=>{const o=[];for(let l=0,u=this._getInstanceCount(i);l<u;l++){const n=this.getBVH(i,l);o.push(n),n&&(t+=this.shouldCluster(i)?n._roots.length:this._countRelevantLeafNodes(n))}r.set(i,o)}),this.primitiveBuffer=new Uint32Array(t*2),this._fillPrimitiveBuffer(this.primitiveBuffer),super.init(e)}getRootRanges(){return[{offset:0,count:this.primitiveBuffer.length/this.primitiveBufferStride}]}refit(...e){ua.copy(this.matrixWorld).invert(),super.refit(...e)}writePrimitiveBounds(e,t,a){const{primitiveBuffer:r,bvhMap:s,objects:i}=this,o=r[2*e+0],l=r[2*e+1],u=i[this.getObjectId(o)],n=this.getInstanceId(o),h=s.get(u)[n],f=this.getBVHRootIndex(l),p=this.getBVHNodeIndex(l);u.isInstancedMesh||u.isBatchedMesh?(u.getMatrixAt(n,Je),Je.premultiply(u.matrixWorld)):Je.copy(u.matrixWorld),Je.premultiply(ua),an(p,new Float32Array(h._roots[f]),da),da.applyMatrix4(Je);const{min:d,max:g}=da;t[a+0]=d.x,t[a+1]=d.y,t[a+2]=d.z,t[a+3]=g.x,t[a+4]=g.y,t[a+5]=g.z}getInstanceId(e){const{idMask:t,idBits:a}=this;return(e&~t)>>>a}getObjectId(e){const{idMask:t}=this;return e&t}getBVHRootIndex(e){return e>>>ct}getBVHNodeIndex(e){return(e&ca)*ue}_getInstanceCount(e){const{includeInstances:t}=this;return e.isInstancedMesh&&t?e.count:e.isBatchedMesh&&t?e.instanceCount:1}_fillPrimitiveBuffer(e){const{objects:t,bvhMap:a,idBits:r,primitiveLimit:s}=this;let i=0;const o=(l,u,n,h)=>{if(h>ca)throw new Error(`ClusteredBVH: cluster node index ${h} exceeds the ${ct}-bit packing limit and cannot be represented.`);if(n>qn)throw new Error(`ClusteredBVH: bvh root index ${n} exceeds the ${$i}-bit packing limit and cannot be represented.`);e[2*i+0]=l<<r|u,e[2*i+1]=n<<ct|h&ca,i++};t.forEach((l,u)=>{a.get(l).forEach((n,h)=>{if(n)if(this.shouldCluster(l))for(let f=0,p=n._roots.length;f<p;f++)o(h,u,f,0);else br(n,s,(f,p)=>{o(h,u,f,p/ue)})})})}_countRelevantLeafNodes(e){const{primitiveLimit:t}=this;let a=0;return br(e,t,(r,s,i,o)=>{a++,o&&i>=t&&console.warn(`ClusteredBVH: a leaf node with ${i} primitives exceeds the cluster primitive limit of ${t} and cannot be subdivided further.`)}),a}}function br(c,e,t){const a=c._roots.length;for(let r=0;r<a;r++)Ze.setBVH(c,r),Ze.traverseBuffer((s,i,o)=>{const l=Ze.getRangeStart(o),n=Ze.getRangeEnd(o)-l;return n<e||i?(t(r,o,n,i),!0):!1});Ze.reset()}function Mi(c,e=new Set){return Array.isArray(c)?c.forEach(t=>Mi(t,e)):c.traverse(t=>{t.isMesh&&e.add(t)}),e}const Ie=new N,Dt=new N,wr={start:0,count:0,vertexStart:0,vertexCount:0};function Gn(c){let e=c;for(;e;){if(e.visible===!1)return!1;e=e.parent}return!0}function Sr(c){return c._roots.reduce((e,t)=>e+t.byteLength/ci,0)}function Tr(c,e){return`${c}_${e}`}class Qn{constructor(e,t={}){const{attributes:a={position:"vec4f"},autogenerateBvh:r=!0}=t;Array.isArray(e)||(e=[e]),e=e.map(s=>{if(s.isObject3D)return s;if(s.isBufferGeometry)return new St(s);if(s instanceof Ta){const i=new St;return i.geometry.boundsTree=s,i}}),this._bvhCache=new Map,this.autogenerateBvh=r,this.attributes=a,this.objects=e,this.bvh=null,this.storage=new ha,this.structs=new ha({transform:Rn}),this.fns=new ha({raycastFirstHit:Vn(this),raycastAnyHit:On(this),closestPointToPoint:Un(this),sampleTrianglePoint:null},B)}getRootObject(){let{objects:e}=this;if(e.isObject3D)return e;Array.isArray(e)||(e=[e]),e=e.map(a=>{if(a.isObject3D)return a;if(a.isBufferGeometry)return new St(a);if(a instanceof Ta){const r=new St;return r.geometry.boundsTree=a,r}});const t=new rn;return t.children=e,t}getShapecastFn(e){return zn(this,e)}update(){const e=this.getRootObject();let t=0;e.traverse(D=>{D.isMesh&&t++}),this.bvh=new jn(e,{strategy:dt,getBVH:(D,na)=>this._getBVHSync(D,na,wr),primitiveLimit:t<3?1/0:64}),this.dispose();const{attributes:a,structs:r,bvh:s}=this,i=[],o=[],l=new Map;let u=Sr(s)*Ra,n=0,h=0;const f=[];let p=0;const d=this._getTransformMap(s),{primitiveBuffer:g,primitiveBufferStride:x}=s;for(let D=0,na=g.length;D<na;D+=x){const oa=g[D],ar=g[D+1],Ns=s.objects[s.getObjectId(oa)],As=s.getInstanceId(oa),rr={start:0,count:0,vertexStart:0,vertexCount:0},Qe=this._getBVHSync(Ns,As,rr);if(!Qe)throw new Error("BVHComputeData: BVH not found.");let Se=i.find(wt=>wt.bvh===Qe);Se||(Se={index:i.length,bvh:Qe,range:rr,geometryOffset:0},n+=Se.range.count,h+=Se.range.vertexCount,i.push(Se));const Ke=s.getBVHRootIndex(ar),bt=s.getBVHNodeIndex(ar)/ue,ir=`${Se.index}_${Ke}_${bt}`;let Xe=l.get(ir);if(Xe===void 0){const wt=Mn(Qe._roots[Ke],bt);Xe={data:Se,root:Ke,node:bt,size:wt,base:0},l.set(ir,Xe),o.push(Xe),u+=wt*Ra,p=Math.max(p,yr(Qe._roots[Ke],bt))}f.push({transformSlot:d.get(Tr(oa,Ke)).slot,subtree:Xe})}if(yr(s._roots[0])+p-1>$a.value)throw new Error("BVHComputeData: BVH depth overruns the compute stack depth.");const T=Math.max(d.size,2);n=Math.max(n,2),h=Math.max(h,2);const S=new $(a,"bvh_GeometryStruct");let C=0,P=0;const F=new Uint32Array(n),A=new ArrayBuffer(h*S.getLength()*4),X=new ArrayBuffer(u);i.forEach(D=>{D.geometryOffset=P/3,D.bvh.indirect||(D.geometryOffset-=D.range.start/3),Pn(D.bvh,D.range,C,P,F),Bn(D.bvh,D.range,C,A,S,this),P+=D.range.count,C+=D.range.vertexCount});let E=Sr(s);o.forEach(D=>{D.base=E,Fn(D.data.bvh._roots[D.root],D.node,D.size,D.data.geometryOffset,E,X),E+=D.size}),f.forEach(D=>D.nodeOffset=D.subtree.base),vr(s,f,0,X);const Y=new ArrayBuffer(r.transform.getLength()*T*4),Le=_(new I(new Uint32Array(X),1),Ne).toReadOnly().setName("bvh_nodes"),ke=new I(new Uint32Array(Y),1),Fs=_(ke,r.transform).toReadOnly().setName("bvh_transforms"),Ps=_(new I(F,1),"uint").toReadOnly().setName("bvh_index"),Bs=_(new I(new Uint32Array(A),S.getLength()),S).toReadOnly().setName("bvh_attributes");this.storage.transforms=Fs,this.storage.nodes=Le,this.storage.index=Ps,this.storage.attributes=Bs,this.structs.attributes=S,Dt.copy(s.matrixWorld).invert(),d.forEach(D=>{this.writeTransformData(D,Dt,D.slot,Y)}),this.fns.sampleTrianglePoint=Wn(this),this._bvhCache.clear()}async updateAsync(){const e=[];this.getRootObject().traverse(t=>{if(!t.isMesh)return;let a=1;t.isInstancedMesh?a=t.count:t.isBatchedMesh&&(a=t.instanceCount);for(let r=0;r<a;r++)e.push(this.getBVH(t,r,wr))}),await Promise.all(e),this.update()}updateTransforms(){const{bvh:e,storage:t}=this;e.refit();const a=t.nodes.proxyNode.value;vr(e,null,0,a.array.buffer),a.needsUpdate=!0;const r=t.transforms.proxyNode.value,s=r.array.buffer;Dt.copy(e.matrixWorld).invert(),this._getTransformMap(e).forEach(i=>{this.writeTransformData(i,Dt,i.slot,s)}),r.needsUpdate=!0}writeTransformData(e,t,a,r){const{structs:s}=this,i=new Float32Array(r),o=new Uint32Array(r),{object:l,instanceId:u}=e;l.isInstancedMesh||l.isBatchedMesh?(l.getMatrixAt(u,Ie),Ie.premultiply(l.matrixWorld)):Ie.copy(l.matrixWorld),Ie.premultiply(t),Ie.toArray(i,a*s.transform.getLength()),Ie.invert(),Ie.toArray(i,a*s.transform.getLength()+16);let n=Gn(l);l.isBatchedMesh&&(n=n&&l.getVisibleAt(u)),o[a*s.transform.getLength()+32]=n?1:0}getBVH(e,t,a){const{autogenerateBvh:r,_bvhCache:s}=this;let i=null;if(e.boundsTree||e.isSkinnedMesh){const o=e.geometry;if(a.count=o.index?o.index.count:o.attributes.position.count,a.vertexCount=o.attributes.position.count,i=e.boundsTree||null,i===null&&r){const l=e.uuid;i=s.get(l)||new lt(e),s.set(l,i)}}else if(e.isBatchedMesh){const o=e.getGeometryIdAt(t),l=e.getGeometryRangeAt(o);if(Object.assign(a,l),i=e.boundsTrees[o]||null,i===null&&r){const u=`batched_${e.geometry.uuid}_${l.start}_${l.count}`;i=s.get(u)||new Ot(e.geometry,{range:{...a}}),s.set(u,i)}}else{const o=e.geometry;if(a.count=o.index?o.index.count:o.attributes.position.count,a.vertexCount=o.attributes.position.count,i=e.geometry.boundsTree||null,i===null&&r){const l=o.uuid;i=s.get(l)||new Ot(o),s.set(l,i)}}return i}getDefaultAttributeValue(e,t){switch(e){case"position":case"color":t.set(1,1,1,1);break;default:t.set(0,0,0,0)}return t}dispose(){var t;const{storage:e}=this;for(const a in e)(t=e[a].value)==null||t.dispose()}_getBVHSync(e,t,a){const r=this.getBVH(e,t,a);if(r instanceof Promise)throw new Error('BVHComputeData: "getBVH" returned a promise. Use "updateAsync" instead.');return r}_getTransformMap(e){const{primitiveBuffer:t,primitiveBufferStride:a}=e,r=new Map;for(let s=0,i=t.length;s<i;s+=a){const o=t[s],l=e.getBVHRootIndex(t[s+1]),u=Tr(o,l);if(r.has(u))continue;const n=r.size,h=e.objects[e.getObjectId(o)],f=e.getInstanceId(o);r.set(u,{object:h,instanceId:f,compositeId:o,root:l,slot:n})}return r}}class ha{constructor(e={},t=L){const a={};return new Proxy({...e},{get(r,s){return a[s]||(a[s]=t(s,r)),a[s]},set(r,s,i){return r[s]=i,!0}})}}const $t=v(`
	fn sampleTexel( tex: texture_2d<f32>, coord: vec2f ) -> vec4f {

		// Manual bilinear filtering using textureLoad to support filterable float32 textures
		// on all devices
		let size = vec2f( textureDimensions( tex, 0 ) );

		// the path tracer stores its color rows top down
		let pxCoord = vec2f( coord.x, 1.0 - coord.y ) * size - 0.5;
		let px = vec2i( floor( pxCoord ) );
		let fr = fract( pxCoord );

		// get the four sibling samples
		let s00 = textureLoad( tex, clamp( px,                 vec2i( 0 ), vec2i( size ) - 1 ), 0 );
		let s10 = textureLoad( tex, clamp( px + vec2i( 1, 0 ), vec2i( 0 ), vec2i( size ) - 1 ), 0 );
		let s01 = textureLoad( tex, clamp( px + vec2i( 0, 1 ), vec2i( 0 ), vec2i( size ) - 1 ), 0 );
		let s11 = textureLoad( tex, clamp( px + vec2i( 1, 1 ), vec2i( 0 ), vec2i( size ) - 1 ), 0 );

		// interpolate on the x axis
		let y0 = mix( s00, s10, fr.x );
		let y1 = mix( s01, s11, fr.x );

		// then y
		return mix( y0, y1, fr.y );

	}
`);class Kn extends gt{get texture(){return this._texNode.value}set texture(e){this._texNode.value=e}get fromTexture(){return this._fromTexNode.value}set fromTexture(e){this._fromTexNode.value=e}get toneMapping(){return this._toneMapping.toneMapping}set toneMapping(e){this._toneMapping.setToneMapping(e)}get transition(){return this._transitionUniform.value}set transition(e){this._transitionUniform.value=e}get exposure(){return this._toneMapping.exposureNode.value}set exposure(e){this._toneMapping.exposureNode.value=e}constructor(e){super();const t=te(new pe);this._texNode=t;const a=te(new pe);this._fromTexNode=a;const r=xt(Ge()),s=w(1);this._transitionUniform=s;const i=m`
			fn fade( uv: vec2f ) -> vec4f {

				if ( ${s} <= 0.0 ) {

					return ${$t}( ${a}, uv );

				} else if ( ${s} >= 1.0 ) {

					return ${$t}( ${t}, uv );

				} else {

					let col0 = ${$t}( ${a}, uv );
					let col1 = ${$t}( ${t}, uv );
					return mix( col0, col1, ${s} );

				}

			}
		`,o=zs(ot,1,i(r));this._toneMapping=o,this.transparent=!0,this.colorNode=ri(o.rgb,o.a),this.setValues(e)}}const Fi=m`
	fn debugHeatColor( t: f32 ) -> vec3f {

		let r = clamp( 1.5 - abs( 4.0 * t - 3.0 ), 0.0, 1.0 );
		let g = clamp( 1.5 - abs( 4.0 * t - 2.0 ), 0.0, 1.0 );
		let b = clamp( 1.5 - abs( 4.0 * t - 1.0 ), 0.0, 1.0 );
		return vec3f( r, g, b );

	}
`,Mt=new $({tlasCount:"uint",blasCount:"uint",didHit:"bool",dist:"float"},"DebugBoundsResult");function Xn(c){const{transforms:e,index:t,attributes:a,materials:r}=c.storage,s=w(new N),i=w(new N),o=w(1),l=w(1),u=w(0),n=w(64),h=Pe(0).toVar("bvh_debugBoundsLevel"),f=ce(1).toVar("bvh_debugRayScalar"),p=ce(0).toVar("bvh_debugMaterialSide"),d=m`
		fn debugGetBoundsOrder( ray: ${R}, splitAxis: u32, node: ${Ne} ) -> bool {

			return ray.direction[ splitAxis ] >= 0.0;

		}
	`,g=m`
		fn debugIntersectsBounds( ray: ${R}, bounds: ${ge}, result: ptr<function, ${Mt}> ) -> u32 {

			let boundsMin = vec3( bounds.min[ 0 ], bounds.min[ 1 ], bounds.min[ 2 ] );
			let boundsMax = vec3( bounds.max[ 0 ], bounds.max[ 1 ], bounds.max[ 2 ] );

			let invDir = 1.0 / ray.direction;
			let tMinPlane = ( boundsMin - ray.origin ) * invDir;
			let tMaxPlane = ( boundsMax - ray.origin ) * invDir;

			let tMinHit = min( tMinPlane, tMaxPlane );
			let tMaxHit = max( tMinPlane, tMaxPlane );

			let t0 = max( max( tMinHit.x, tMinHit.y ), tMinHit.z );
			let t1 = min( min( tMaxHit.x, tMaxHit.y ), tMaxHit.z );

			let dist = max( t0, 0.0 );
			if ( t1 < dist ) {

				return 0u;

			} else if ( result.didHit && dist * ${f} >= result.dist ) {

				return 0u;

			}

			if ( ${h} == 1u ) {

				result.blasCount = result.blasCount + 1u;

			} else {

				result.tlasCount = result.tlasCount + 1u;

			}

			return 1u;

		}
	`,x=m`
		fn debugIntersectRange( ray: ${R}, offset: u32, count: u32, result: ptr<function, ${Mt}> ) -> bool {

			var didHit = false;
			if ( ${u} > 0.5 ) {

				for ( var ti = offset; ti < offset + count; ti = ti + 1u ) {

					let i0 = ${t}[ ti * 3u ];
					let i1 = ${t}[ ti * 3u + 1u ];
					let i2 = ${t}[ ti * 3u + 2u ];

					let a = ${a}[ i0 ].position.xyz;
					let b = ${a}[ i1 ].position.xyz;
					let c = ${a}[ i2 ].position.xyz;

					var triResult = ${bi}( ray, a, b, c );
					triResult.dist *= ${f};
					if ( triResult.didHit && ( ! result.didHit || triResult.dist < result.dist ) ) {

						// cull faces that don't match the material side
						if ( ${p} != 0.0 && triResult.side != ${p} ) {

							continue;

						}

						result.didHit = true;
						result.dist = triResult.dist;
						didHit = true;

					}

				}

			}

			return didHit;

		}
	`,y=m`
		fn debugTransformRay( ray: ptr<function, ${R}>, objectIndex: u32 ) -> void {

			let object = ${e}[ objectIndex ];
			let toLocal = object.inverseMatrixWorld;
			ray.origin = ( toLocal * vec4f( ray.origin, 1.0 ) ).xyz;
			ray.direction = ( toLocal * vec4f( ray.direction, 0.0 ) ).xyz;

			let len = length( ray.direction );
			ray.direction = ray.direction / len;
			${f} = 1.0 / len;

			${p} = ${r}[ object.materialIndex ].side;
			${h} = 1u;

		}
	`,b=m`
		fn debugResetLevel( objectIndex: u32 ) -> void {

			${f} = 1.0;
			${h} = 0u;

		}
	`,T=c.getShapecastFn({name:"debugBoundsCount",shapeStruct:R,resultStruct:Mt,boundsOrderFn:d,intersectsBoundsFn:g,intersectRangeFn:x,transformShapeFn:y,resetShapeFn:b}),S=m`
		fn debugBounds( vUv: vec2f ) -> vec4f {

			let ndc = vUv * 2.0 - vec2f( 1.0 );
			var ray = ${Xt}( ndc, ${s} * ${i} );
			ray.direction = normalize( ray.direction );

			// count the boxes the ray crosses, pruning those behind the nearest hit surface
			var result: ${Mt};
			${T}( ray, &result );

			let tlas = select( 0u, result.tlasCount, ${o} > 0.5 );
			let blas = select( 0u, result.blasCount, ${l} > 0.5 );
			let count = tlas + blas;

			let t = clamp( f32( count ) / max( ${n}, 1.0 ), 0.0, 1.0 );

			return vec4f( ${Fi}( t ), 1.0 );

		}
	`;return S.uniforms={cameraToModelMatrix:s,inverseProjectionMatrix:i,displayTLAS:o,displayBLAS:l,stopAtSurface:u,saturationCount:n},S}class k{get computeNode(){return this.kernel.computeNode}get workgroupSize(){return this.kernel.workgroupSize}set needsUpdate(e){this.setWorkgroupSize(...this.workgroupSize)}constructor(e,t={}){const{workgroupSize:a=[64],context:r={}}=t;this._fn=e,this.kernel=null,this.context=r,this.setWorkgroupSize(...a)}defineUniformAccessors(e){for(const t in e){if(t in this)throw new Error(`ComputeNode: Uniform name ${t} is already defined.`);const a=e[t];a.isStorageBufferNode&&!a.name&&a.setName(`kernel_${t}`),"value"in a&&Object.defineProperty(this,t,{get(){return e[t].value},set(r){e[t].value=r}})}}setWorkgroupSize(e=64,t=1,a=1){var s;const r=this._fn.context(this.context);return r.parameters=this._fn.parameters,(s=this.kernel)==null||s.dispose(),this.kernel=r.computeKernel([e,t,a]),this}dispose(){var e;(e=this.kernel)==null||e.dispose(),this.kernel=null}getDispatchSize(e=1,t=1,a=1,r=[]){const[s,i,o]=this.workgroupSize;return r.length=3,r[0]=Math.ceil(e/s),r[1]=Math.ceil(t/i),r[2]=Math.ceil(a/o),r}}const M=pt(`

	const PI: f32 = 3.141592653589793;
	const EPSILON: f32 = 1e-5;
	const MIN_ROUGHNESS: f32 = 1e-3;
	const MIN_INCIDENT_COS: f32 = 1e-3;

`),_e=new $({color:"vec3f",isTransmissive:"bool",direction:"vec3f",pdf:"float"},"ScatterRecord"),Ir=new $({reflectance:"vec3f",transmittance:"vec3f",reflectProbability:"float"},"TransmissionFresnel"),Pi=new $({color:"vec3",map:"int",metalness:"float",metalnessMap:"int",roughness:"float",roughnessMap:"int",ior:"float",transmission:"float",transmissionMap:"int",emissiveIntensity:"float",emissive:"vec3",emissiveMap:"int",normalMap:"int",normalScale:"vec2",clearcoat:"float",clearcoatMap:"int",clearcoatNormalMap:"int",clearcoatNormalScale:"vec2",clearcoatRoughness:"float",clearcoatRoughnessMap:"int",iridescenceMap:"int",iridescenceThicknessMap:"int",iridescence:"float",iridescenceIor:"float",iridescenceThicknessMinimum:"float",iridescenceThicknessMaximum:"float",diffuseRoughness:"float",dispersion:"float",specularColor:"vec3",specularColorMap:"int",specularIntensity:"float",specularIntensityMap:"int",thinWall:"int",attenuationColor:"vec3",attenuationDistance:"float",alphaMap:"int",castShadow:"int",opacity:"float",alphaTest:"float",side:"float",matte:"int",sheen:"float",sheenColor:"vec3",sheenColorMap:"int",sheenRoughness:"float",sheenRoughnessMap:"int",vertexColors:"int",flatShading:"int",transparent:"int",fogVolume:"int",anisotropy:"float",anisotropyRotation:"float",anisotropyMap:"int",mapTransform:"mat3",metalnessMapTransform:"mat3",roughnessMapTransform:"mat3",transmissionMapTransform:"mat3",emissiveMapTransform:"mat3",normalMapTransform:"mat3",clearcoatMapTransform:"mat3",clearcoatNormalMapTransform:"mat3",clearcoatRoughnessMapTransform:"mat3",sheenColorMapTransform:"mat3",sheenRoughnessMapTransform:"mat3",iridescenceMapTransform:"mat3",iridescenceThicknessMapTransform:"mat3",specularColorMapTransform:"mat3",specularIntensityMapTransform:"mat3",alphaMapTransform:"mat3",anisotropyMapTransform:"mat3",multiscatterColor:"vec3",scatterStrength:"float",scatterAnisotropy:"float"},"Material"),Q=new $({volumeParticle:"bool",faceNormal:"vec3f",frontFace:"bool",normal:"vec3f",normalBasis:"mat3x3f",normalInvBasis:"mat3x3f",eta:"f32",f0:"f32",roughness:"f32",diffuseRoughness:"f32",metalness:"f32",anisotropy:"f32",color:"vec3f",emission:"vec3f",opacity:"f32",ior:"f32",transmission:"f32",thinWall:"bool",attenuationColor:"vec3f",attenuationDistance:" f32",clearcoatNormal:"vec3f",clearcoatBasis:"mat3x3f",clearcoatInvBasis:"mat3x3f",clearcoat:"f32",clearcoatRoughness:"f32",sheen:"f32",sheenColor:"vec3f",sheenRoughness:"f32",iridescence:"f32",iridescenceIor:"f32",iridescenceThickness:"f32",specularColor:"vec3f",specularIntensity:"f32"},"SurfaceRecord");new $({rotation:"mat3x3f",intensity:"float",blur:"float",totalSum:"float"},"EnvironmentInfo");const _r=new $({color:"vec3f",direction:"vec3f",pdf:"float"},"EnvironmentSample"),Re=new $({position:"vec3f",lightType:"int",color:"vec3f",intensity:"float",u:"vec3f",visibleToCameraRays:"int",v:"vec3f",area:"float",radius:"float",decay:"float",distance:"float",coneCos:"float",penumbraCos:"float",iesProfile:"int"},"Light"),me=new $({dist:"float",direction:"vec3f",pdf:"float",emission:"vec3f",lightType:"int"},"LightRecord"),Yn=new $({diffuse:"float",specular:"float",transmission:"float",clearcoat:"float"},"LobeWeights"),Rr=new $({V:"vec3f",L:"vec3f",H:"vec3f",VdotH:"float"},"BxDFContext"),oe=3,Zn=.02,Jn=.98,Bi=m`

	fn isAuxSurface( surface: ${Q}, scatterRec: ${_e} ) -> bool {

		let isMirror = surface.roughness <= ${Zn} && surface.metalness >= ${Jn};
		return ! scatterRec.isTransmissive && ! isMirror;

	}

`,Ea=m`

	fn unpackAuxAlbedo( packed: vec3u ) -> vec3f {

		return vec3f( unpack2x16float( packed.x ), unpack2x16float( packed.y ).x );

	}

`,za=m`

	fn unpackAuxNormal( packed: vec3u ) -> vec3f {

		return vec3f( unpack2x16float( packed.z ), unpack2x16float( packed.y ).y );

	}

`,Ni=m`

	fn blendAux( packed: vec3u, albedo: vec3f, normal: vec3f, weight: f32 ) -> vec3u {

		let meanAlbedo = mix( ${Ea}( packed ), albedo, weight );
		let meanNormal = mix( ${za}( packed ), normal * 0.5 + 0.5, weight );
		return vec3u(
			pack2x16float( meanAlbedo.rg ),
			pack2x16float( vec2f( meanAlbedo.b, meanNormal.z ) ),
			pack2x16float( meanNormal.xy ),
		);

	}

`;function We(c=""){const e=new pe(1,1);return e.format=ae,e.type=Be,e.colorSpace=sn.workingColorSpace,e.name=c,e.generateMipmaps=!1,e}function Yt(c=""){const e=new pe(1,1);return e.format=hi,e.type=fi,e.name=c,e.generateMipmaps=!1,e}function Ue(c=""){const e=new Hs(1,1,oe);return e.format=hi,e.type=fi,e.name=c,e.generateMipmaps=!1,e}function Wt(c=""){const e=new pe(1,1);return e.format=ae,e.type=G,e.name=c,e.generateMipmaps=!1,e}const Cr=Pe(256*256),Ai=ce(1/16777216),eo=pt(`

	const SOBOL_DIRECTIONS_1 = array<u32, 32>(
		0x80000000u, 0xc0000000u, 0xa0000000u, 0xf0000000u,
		0x88000000u, 0xcc000000u, 0xaa000000u, 0xff000000u,
		0x80800000u, 0xc0c00000u, 0xa0a00000u, 0xf0f00000u,
		0x88880000u, 0xcccc0000u, 0xaaaa0000u, 0xffff0000u,
		0x80008000u, 0xc000c000u, 0xa000a000u, 0xf000f000u,
		0x88008800u, 0xcc00cc00u, 0xaa00aa00u, 0xff00ff00u,
		0x80808080u, 0xc0c0c0c0u, 0xa0a0a0a0u, 0xf0f0f0f0u,
		0x88888888u, 0xccccccccu, 0xaaaaaaaau, 0xffffffffu
	);

	const SOBOL_DIRECTIONS_2 = array<u32, 32>(
		0x80000000u, 0xc0000000u, 0x60000000u, 0x90000000u,
		0xe8000000u, 0x5c000000u, 0x8e000000u, 0xc5000000u,
		0x68800000u, 0x9cc00000u, 0xee600000u, 0x55900000u,
		0x80680000u, 0xc09c0000u, 0x60ee0000u, 0x90550000u,
		0xe8808000u, 0x5cc0c000u, 0x8e606000u, 0xc5909000u,
		0x6868e800u, 0x9c9c5c00u, 0xeeee8e00u, 0x5555c500u,
		0x8000e880u, 0xc0005cc0u, 0x60008e60u, 0x9000c590u,
		0xe8006868u, 0x5c009c9cu, 0x8e00eeeeu, 0xc5005555u
	);

	const SOBOL_DIRECTIONS_3 = array<u32, 32>(
		0x80000000u, 0xc0000000u, 0x20000000u, 0x50000000u,
		0xf8000000u, 0x74000000u, 0xa2000000u, 0x93000000u,
		0xd8800000u, 0x25400000u, 0x59e00000u, 0xe6d00000u,
		0x78080000u, 0xb40c0000u, 0x82020000u, 0xc3050000u,
		0x208f8000u, 0x51474000u, 0xfbea2000u, 0x75d93000u,
		0xa0858800u, 0x914e5400u, 0xdbe79e00u, 0x25db6d00u,
		0x58800080u, 0xe54000c0u, 0x79e00020u, 0xb6d00050u,
		0x800800f8u, 0xc00c0074u, 0x200200a2u, 0x50050093u
	);

	const SOBOL_DIRECTIONS_4 = array<u32, 32>(
		0x80000000u, 0x40000000u, 0x20000000u, 0xb0000000u,
		0xf8000000u, 0xdc000000u, 0x7a000000u, 0x9d000000u,
		0x5a800000u, 0x2fc00000u, 0xa1600000u, 0xf0b00000u,
		0xda880000u, 0x6fc40000u, 0x81620000u, 0x40bb0000u,
		0x22878000u, 0xb3c9c000u, 0xfb65a000u, 0xddb2d000u,
		0x78022800u, 0x9c0b3c00u, 0x5a0fb600u, 0x2d0ddb00u,
		0xa2878080u, 0xf3c9c040u, 0xdb65a020u, 0x6db2d0b0u,
		0x800228f8u, 0x400b3cdcu, 0x200fb67au, 0xb00ddb9du
	);

`),Li=Pe(0).toVar("sobolPixelIndex"),ki=Pe(0).toVar("sobolPathIndex"),Ha=Pe(0).toVar("sobolBounceIndex"),Ft=v(`
	fn getMaskedSobol( index: u32, directions: array<u32, 32> ) -> u32 {

		var X = 0u;
		for ( var bit = 0u; bit < 32u; bit ++ ) {

			let mask = ( index >> bit ) & 1u;
			X ^= mask * directions[ bit ];

		}
		return X;

	}
`),to=(c=1)=>{if(c<=0)return;const e=c>1?`vec${c}u`:"u32",t=v(`
		fn sobolReverseBits_${e}( in: ${e} ) -> ${e} {

			var x = in;
			x = ( ( ( x & ${e}( 0xaaaaaaaau ) ) >> ${e}( 1 ) ) | ( ( x & ${e}( 0x55555555u ) ) << ${e}( 1 ) ) );
			x = ( ( ( x & ${e}( 0xccccccccu ) ) >> ${e}( 2 ) ) | ( ( x & ${e}( 0x33333333u ) ) << ${e}( 2 ) ) );
			x = ( ( ( x & ${e}( 0xf0f0f0f0u ) ) >> ${e}( 4 ) ) | ( ( x & ${e}( 0x0f0f0f0fu ) ) << ${e}( 4 ) ) );
			x = ( ( ( x & ${e}( 0xff00ff00u ) ) >> ${e}( 8 ) ) | ( ( x & ${e}( 0x00ff00ffu ) ) << ${e}( 8 ) ) );
			return ( ( x >> ${e}( 16 ) ) | ( x << ${e}( 16 ) ) );

		}
	`),a=v(`
		fn sobolHashCombine_${e}( seed: u32, v: ${e} ) -> ${e} {

			return ${e}( seed ) ^ ( v + ${e}( ( seed << 6 ) + ( seed >> 2 ) ) );

		}
	`),r=v(`
		fn sobolLaineKarrasPermutation_${e}( in: ${e}, seed: ${e} ) -> ${e} {

			var x = in;
			x += seed;
			x ^= x * 0x6c50b47cu;
			x ^= x * 0xb82f1e52u;
			x ^= x * 0xc7afe638u;
			x ^= x * 0x8d22f6e6u;
			return x;

		}
	`),s=m`
		fn nestedUniformScrambleBase2_${e}( x: ${e}, seed: ${e} ) -> ${e} {

			var res = ${r}( x, seed );
			res = ${t}( res );
			return res;

		}
	`;return{reverseBits:t,hashCombine:a,lkPermutation:r,scramble:s}},J=Array.from({length:5},(c,e)=>to(e)),ao=m`
  	${[eo]}
	fn generateSobolPoint( id: u32 ) -> vec4f {

		var index = id;
		if ( index >= ${Cr} ) {

			index = index % ${Cr};
			// return vec4( 0.0 );

		}

		// NOTE: this sobol "direction" is also available but we can't write out 5 components
		// uint x = index & 0x00ffffffu;
		let x = ${J[1].reverseBits}( ${Ft}( index, SOBOL_DIRECTIONS_1 ) ) & 0x00ffffffu;
		let y = ${J[1].reverseBits}( ${Ft}( index, SOBOL_DIRECTIONS_2 ) ) & 0x00ffffffu;
		let z = ${J[1].reverseBits}( ${Ft}( index, SOBOL_DIRECTIONS_3 ) ) & 0x00ffffffu;
		let w = ${J[1].reverseBits}( ${Ft}( index, SOBOL_DIRECTIONS_4 ) ) & 0x00ffffffu;

		return vec4( f32( x ), f32( y ), f32( z ), f32( w ) ) * ${Ai};

	}
`,Dr=v(`
	fn sobolHash( in: u32 ) -> u32 {

		var x = in;
		// finalizer from murmurhash3
		x ^= x >> 16;
		x *= 0x85ebca6bu;
		x ^= x >> 13;
		x *= 0xc2b2ae35u;
		x ^= x >> 16;
		return x;

	}
`),ro=m`
	fn sobolGetSeed( effect: u32 ) -> u32 {

		return ${Dr}(
			${J[1].hashCombine}(
				${J[1].hashCombine}(
					${Dr}( ${Ha} ),
					${Li}
				),
				effect
			)
		);

	}
`,Zt=(c=1,e=ao)=>{if(c<=0)return;const t=c>1?`vec${c}u`:"u32",a=c>1?`vec${c}f`:"f32";let r=".r",s="1u";return c===2?(r=".rg",s="vec2( 1u, 2u )"):c===3?(r=".rgb",s="vec3( 1u, 2u, 3u )"):c===4&&(r="",s="vec4( 1u, 2u, 3u, 4u )"),m`
		fn sobol${c}( effect: u32 ) -> ${a} {

			let seed = ${ro}( effect );
			let index = ${ki};

			let shuffle_seed = ${J[1].hashCombine}( seed, 0u );
			let shuffled_index = ${J[1].scramble}( ${J[1].reverseBits}( index ), shuffle_seed );
			let sobol_pt = ${e}( shuffled_index )${r};
			var result = ${t}( sobol_pt * 16777216.0 );

			let seed2 = ${J[c].hashCombine}( seed, ${s} );
			result = ${J[c].scramble}( result, seed2 );

			return ${Ai} * ${a}( result >> ${t}( 8 ) );

		}
	`},Ei=Zt(1),zi=Zt(2),Hi=Zt(3),Oa=Zt(4),Va=m`
	fn sobolInit( pixel: vec2u, pathIndex: u32, bounceIndex: u32 ) -> void {

		${Li} = ( pixel.x << 16 ) | pixel.y;
		${ki} = pathIndex;
		${Ha} = bounceIndex;

	}
`,Wa=m`
	fn sobolNextBounce() -> void {

		${Ha}++;

	}
`,io=Object.freeze(Object.defineProperty({__proto__:null,rand1:Ei,rand2:zi,rand3:Hi,rand4:Oa,rngInit:Va,rngNextBounce:Wa},Symbol.toStringTag,{value:"Module"})),Oi=0,Vi=1,so=2,Wi=3,no=4,Ui=5,qi=6,ji=7,Gi=8,Qi=9,Ki=50,Me=q("random.rngInit",Va),zt=q("random.rngNextBounce",Wa),$e=q("random.rand1",Ei),ne=q("random.rand2",zi),Ua=q("random.rand3",Hi);q("random.rand4",Oa);const oo=v(`

	fn inverse(m: mat3x3f) -> mat3x3f {
		var adj: mat3x3f;
		adj[0][0] =   (m[1][1] * m[2][2] - m[2][1] * m[1][2]);
		adj[1][0] = - (m[1][0] * m[2][2] - m[2][0] * m[1][2]);
		adj[2][0] =   (m[1][0] * m[2][1] - m[2][0] * m[1][1]);
		adj[0][1] = - (m[0][1] * m[2][2] - m[2][1] * m[0][2]);
		adj[1][1] =   (m[0][0] * m[2][2] - m[2][0] * m[0][2]);
		adj[2][1] = - (m[0][0] * m[2][1] - m[2][0] * m[0][1]);
		adj[0][2] =   (m[0][1] * m[1][2] - m[1][1] * m[0][2]);
		adj[1][2] = - (m[0][0] * m[1][2] - m[1][0] * m[0][2]);
		adj[2][2] =   (m[0][0] * m[1][1] - m[1][0] * m[0][1]);

		let det = ( m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1])
			- m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0])
			+ m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0]));

		return adj * ( 1.0 / det );
	}

`),lo=v(`

	fn getBasisFromNormal( normal: vec3f ) -> mat3x3f {

		var other: vec3f;
		if ( abs( normal.x ) > 0.5 ) {

			other = vec3f( 0.0, 1.0, 0.0 );

		} else {

			other = vec3f( 1.0, 0.0, 0.0 );

		}

		let ortho = normalize( cross( normal, other ) );
		let ortho2 = normalize( cross( normal, ortho ) );
		return mat3x3f( ortho2, ortho, normal );

	}

`),le=v(`

	fn iorToF0( ior: f32 ) -> f32 {
		return pow( ( 1 - ior ) / ( 1 + ior ), 2 );
	}

`),co=v(`

	fn iorToF0General( transmittedIor: f32, incidentIor: f32 ) -> f32 {

		return pow( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ), 2 );

	}

`),uo=v(`

	fn iorToF0GeneralVec( transmittedIor: vec3f, incidentIor: vec3f ) -> vec3f {

		let v = ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor );
		return v * v;

	}

`),ho=v(`

	fn fresnel0ToIor( f0: vec3f ) -> vec3f {

		let sqrtF0 = sqrt( f0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );

	}

`),Ae=v(`

	fn schlickFresnel( cosine: f32, f0: f32 ) -> f32 {

		return f0 + ( 1.0 - f0 ) * pow( 1.0 - cosine, 5.0 );

	}

`),Jt=v(`

	fn schlickFresnelVec( cosine: f32, f0: vec3f, f90: vec3f ) -> vec3f {

		return f0 + ( f90 - f0 ) * pow( 1.0 - cosine, 5.0 );

	}

`),qa=v(`

	fn totalInternalReflection( cosTheta: f32, eta: f32 ) -> bool {

		let sinTheta = sqrt( 1.0 - cosTheta * cosTheta );
		return eta * sinTheta > 1.0;

	}

`),fo=v(`

	fn totalInternalReflectionVec( cosTheta: f32, eta: vec3f ) -> vec3<bool> {

		let sinTheta = sqrt( 1.0 - cosTheta * cosTheta );
		return eta * sinTheta > vec3f( 1.0 );

	}

`);v(`

	fn evaluateFresnel( cosine: f32, eta: f32, f0: vec3f, f90: vec3f ) -> vec3f {

		if ( totalInternalReflection( cosine, eta ) ) {

			return f90;

		}

		return f0 + ( f90 - f0 ) * pow( 1.0 - cosine, 5.0 );
	}

`,[qa]);const vt=v(`

	fn dielectricFresnel( cosThetaI: f32, eta: f32 ) -> f32 {

		// https://schuttejoe.github.io/post/disneybsdf/
		let ni = eta;
		let nt = 1.0;

		// Check for total internal reflection
		let sinThetaISq = 1.0 - cosThetaI * cosThetaI;
		let sinThetaTSq = eta * eta * sinThetaISq;
		if ( sinThetaTSq >= 1.0 ) {

			return 1.0;

		}

		let sinThetaT = sqrt( sinThetaTSq );
		let cosThetaT = sqrt( max( 0.0, 1.0 - sinThetaT * sinThetaT ) );
		let rParallel = ( ( nt * cosThetaI ) - ( ni * cosThetaT ) ) / ( ( nt * cosThetaI ) + ( ni * cosThetaT ) );
		let rPerpendicular = ( ( ni * cosThetaI ) - ( nt * cosThetaT ) ) / ( ( ni * cosThetaI ) + ( nt * cosThetaT ) );
		return ( rParallel * rParallel + rPerpendicular * rPerpendicular ) / 2.0;

	}

`),mo=v(`

	fn disneyFresnel( wo: vec3f, wi: vec3f, wh: vec3f, f0: f32, eta: f32, metalness: f32 ) -> f32 {

		let dotHV = dot( wo, wh );
		if ( totalInternalReflection( dotHV, eta ) ) {

			return 1.0;

		}

		let dotHL = dot( wi, wh );
		let dielectricF = dielectricFresnel( abs( dotHV ), eta );
		let metallicF = schlickFresnel( dotHL, f0 );

		return mix( dielectricF, metallicF, metalness );

	}

`,[qa,vt,Ae]),ja=v(`

	fn isTerminatingScatter( scatterRec: ScatterRecord ) -> bool {

		return scatterRec.pdf <= 0;

	}

`,[_e]),z=v(`

	fn clampPathContribution( contribution: vec3f, pathDepth: u32, clampDirect: f32, clampIndirect: f32 ) -> vec3f {

		let limit = select( clampIndirect, clampDirect, pathDepth <= 1u ) * 3.0;
		if ( limit <= 0.0 ) {

			return contribution;

		}

		let strength = dot( abs( contribution ), vec3f( 1.0 ) );
		if ( strength > limit ) {

			return contribution * ( limit / strength );

		}

		return contribution;

	}

`),$r=v(`

	fn applyWrap( v: f32, wrapMode: i32 ) -> f32 {

		var res = v;
		if ( wrapMode == 1 ) {

			// ClampToEdge
			res = clamp( res, 0.0, 1.0 );

		} else if ( wrapMode == 2 ) {

			// MirroredRepeat
			res = 1.0 - abs( 2.0 * fract( res * 0.5 ) - 1.0 );

		} else {

			// Repeat
			res = fract( res );

		}

		return res;

	}

`),Ce=v(`

	fn offsetRayOrigin( point: vec3f, direction: vec3f, geometricNormal: vec3f ) -> vec3f {

		let normal = normalize( select( -geometricNormal, geometricNormal, dot( direction, geometricNormal ) >= 0.0 ) );
		let intScale = 256.0;
		let integerOffset = vec3i( intScale * normal );
		let pointBits = bitcast<vec3i>( point );
		let signedOffset = select( integerOffset, -integerOffset, point < vec3f( 0.0 ) );
		let offsetPoint = bitcast<vec3f>( pointBits + signedOffset );
		let origin = 1.0 / 32.0;
		let floatScale = 1.0 / 65536.0;
		return select( offsetPoint, point + floatScale * normal, abs( point ) < vec3f( origin ) );

	}

`),Pt=v(`

	fn wrapTexelIndex( i: i32, size: i32, wrapMode: i32 ) -> i32 {

		if ( wrapMode == 0 ) {

			// Repeat wraps to the opposite edge
			return ( ( i % size ) + size ) % size;

		}

		// ClampToEdge and MirroredRepeat both fold back onto the edge texel
		return clamp( i, 0, size - 1 );

	}

`),Xi=(c,e,t="sampleTexel")=>m`

	fn ${t}( uv: vec2f, packed: i32, lod: f32 ) -> vec4f {

		let texIndex = packed & 0x7FFFFF;
		let wrapS    = ( packed >> 26 ) & 0x3;
		let wrapT    = ( packed >> 28 ) & 0x3;
		let nearest  = ( packed >> 30 ) & 0x1;

		// look up the texture's rect and page within the atlas. three wraps a
		// uniformArray in a struct ( textureInfoStruct ) with a "value" array member.
		let info   = ${c}[ u32( texIndex ) ];
		let offset = vec2f( vec2u( info.x & 0xFFFFu, info.x >> 16u ) );
		let size   = vec2f( vec2u( info.y & 0xFFFFu, info.y >> 16u ) );
		let page   = i32( info.z & 0xFFFFu );

		// wrap is applied on the logical uv first, then remapped into the tile
		let wrappedUv = vec2f(
			${$r}( uv.x, wrapS ),
			${$r}( uv.y, wrapT ),
		);

		if ( nearest == 1 ) {

			let tileTexel = clamp( vec2i( wrappedUv * size ), vec2i( 0 ), vec2i( size ) - vec2i( 1 ) );
			return textureLoad( ${e}, vec2i( offset ) + tileTexel, page, 0 );

		} else {

			// The tile's neighbors in the atlas are unrelated textures, so hardware
			// filtering cannot supply the taps that fall outside it. Filter here instead
			// and resolve each tap through the wrap mode.
			let texelPos = wrappedUv * size - vec2f( 0.5 );
			let basePos = floor( texelPos );
			let base = vec2i( basePos );
			let f = texelPos - basePos;

			let intSize = vec2i( size );
			let x0 = ${Pt}( base.x,     intSize.x, wrapS );
			let x1 = ${Pt}( base.x + 1, intSize.x, wrapS );
			let y0 = ${Pt}( base.y,     intSize.y, wrapT );
			let y1 = ${Pt}( base.y + 1, intSize.y, wrapT );

			let tile = vec2i( offset );
			let c00 = textureLoad( ${e}, tile + vec2i( x0, y0 ), page, 0 );
			let c10 = textureLoad( ${e}, tile + vec2i( x1, y0 ), page, 0 );
			let c01 = textureLoad( ${e}, tile + vec2i( x0, y1 ), page, 0 );
			let c11 = textureLoad( ${e}, tile + vec2i( x1, y1 ), page, 0 );

			return mix(
				mix( c00, c10, f.x ),
				mix( c01, c11, f.x ),
				f.y,
			);

		}

	}
`,po=v(`

	fn sampleSphere( uv: vec2f ) -> vec3f {

		let u = ( uv.x - 0.5 ) * 2.0;
		let t = uv.y * PI * 2.0;
		let f = sqrt( 1.0 - u * u );

		return vec3f( f * cos( t ), f * sin( t ), u );

	}

`,[M]),go=v(`

	fn diffuseDirection( wo: vec3f, uv: vec2f ) -> vec3f {

		var lightDirection = sampleSphere( uv );
		lightDirection.z += 1.0;
		lightDirection = normalize( lightDirection );

		return lightDirection;

	}

`,[po]),Mr=v(`

	fn getLobeWeights( wo: vec3f, wi: vec3f, woClearcoat: vec3f, wh: vec3f, clearcoatIor: f32, surf: SurfaceRecord ) -> LobeWeights {

		var weights: LobeWeights;
		var remaining = 1.0;

		let clearcoatF0 = iorToF0( clearcoatIor );
		let clearcoatFresnel = schlickFresnel( saturate( woClearcoat.z ), clearcoatF0 );
		weights.clearcoat = surf.clearcoat * clearcoatFresnel;
		remaining -= weights.clearcoat;

		// this specular lobe only handles the opaque portion of the specular
		let fEstimate = disneyFresnel( wo, wi, wh, surf.f0, surf.eta, surf.metalness );
		weights.specular = remaining * ( surf.metalness + ( 1.0 - surf.metalness ) * ( 1.0 - surf.transmission ) * fEstimate );
		remaining -= weights.specular;

		// the transmission lobe covers both the reflected and refracted halves of the transmissive portion
		weights.transmission = remaining * surf.transmission;
		remaining -= weights.transmission;

		weights.diffuse = remaining;

		return weights;

	}

`,[mo,Ae,le,Yn,M]),Ut=v(`

	fn equirectDirectionToUv(direction: vec3f) -> vec2f {

		// from Spherical.setFromCartesianCoords
		var uv = vec2f( atan2( direction.z, direction.x ), acos( direction.y ) );
		uv /= vec2f( 2.0 * PI, PI );

		// apply adjustments to get values in range [0, 1] and y right side up
		uv.x += 0.5;
		uv.y = 1.0 - uv.y;
		return uv;

	}

`),xo=v(`

	fn sampleHemisphere( n: vec3f, uv: vec2f ) -> vec3f {

		// https://www.rorydriscoll.com/2009/01/07/better-sampling/
		// https://graphics.pixar.com/library/OrthonormalB/paper.pdf
		let sign = select( sign( n.z ), 1.0, n.z == 0.0 );
		let a = - 1.0 / ( sign + n.z );
		let b = n.x * n.y * a;
		let b1 = vec3( 1.0 + sign * n.x * n.x * a, sign * b, - sign * n.x );
		let b2 = vec3( b, sign + n.y * n.y * a, - n.y );

		let r = sqrt( uv.x );
		let theta = 2.0 * PI * uv.y;
		let x = r * cos( theta );
		let y = r * sin( theta );
		return x * b1 + y * b2 + sqrt( 1.0 - uv.x ) * n;

	}

`,[M]),vo=.001,Yi=v(`

	fn sampleHenyeyGreenstein( d: vec3f, g: f32, uv: vec2f ) -> vec3f {

		var cosTheta = 1.0 - 2.0 * uv.x;
		if ( abs( g ) > ${vo} ) {

			let sqrTerm = ( 1.0 - g * g ) / ( 1.0 - g + 2.0 * g * uv.x );
			cosTheta = clamp( ( 1.0 + g * g - sqrTerm * sqrTerm ) / ( 2.0 * g ), - 1.0, 1.0 );

		}

		// orthonormal basis around "d", from https://graphics.pixar.com/library/OrthonormalB/paper.pdf
		let sign = select( sign( d.z ), 1.0, d.z == 0.0 );
		let a = - 1.0 / ( sign + d.z );
		let b = d.x * d.y * a;
		let b1 = vec3( 1.0 + sign * d.x * d.x * a, sign * b, - sign * d.x );
		let b2 = vec3( b, sign + d.y * d.y * a, - d.y );

		let sinTheta = sqrt( max( 0.0, 1.0 - cosTheta * cosTheta ) );
		let phi = 2.0 * PI * uv.y;
		return normalize( sinTheta * cos( phi ) * b1 + sinTheta * sin( phi ) * b2 + cosTheta * d );

	}

`,[M]),ye=v(`

	fn misHeuristic( a: f32, b: f32 ) -> f32 {

		// computed as a ratio so squaring large pdfs can't overflow to Inf / Inf
		if ( a >= b ) {

			let r = b / a;
			return 1.0 / ( 1.0 + r * r );

		}

		let r = a / b;
		return r * r / ( 1.0 + r * r );

	}

`),yo=v(`

	fn luminance( color: vec3f ) -> f32 {

		return dot( color, vec3f( 0.2126, 0.7152, 0.0722 ) );

	}

`),bo=v(`

	fn equirectUvToDirection( uvIn: vec2f ) -> vec3f {

		// undo the adjustments applied in equirectDirectionToUv
		var uv = uvIn;
		uv.x -= 0.5;
		uv.y = 1.0 - uv.y;

		let theta = uv.x * 2.0 * PI;
		let phi = uv.y * PI;
		let sinPhi = sin( phi );

		return vec3f( sinPhi * cos( theta ), cos( phi ), sinPhi * sin( theta ) );

	}

`,[M]);v(`

	fn equirectDirectionPdf( direction: vec3f ) -> f32 {

		let uv = equirectDirectionToUv( direction );
		let theta = uv.y * PI;
		let sinTheta = sin( theta );
		if ( sinTheta == 0.0 ) {

			return 0.0;

		}

		return 1.0 / ( 2.0 * PI * PI * sinTheta );

	}

`,[M,Ut]);const Zi=v(`

	fn weightedAlphaBlend( prevColor: vec4f, newColor: vec4f, weight: f32 ) -> vec4f {

		let invWeight = 1.0 - weight;
		let totalAlpha = prevColor.a * invWeight + newColor.a * weight;
		var blendedColor = vec4f( 0 );
		if ( totalAlpha != 0.0 ) {

			let prevContrib = prevColor.rgb * invWeight * prevColor.a / totalAlpha;
			let resContrib = newColor.rgb * weight * newColor.a / totalAlpha;
			blendedColor = vec4f( prevContrib + resContrib, totalAlpha );

		}

		return blendedColor;

	}

`),Ga=0,Qa=1,Fr=2,Pr=3,Br=4,Ka=5,Fe=1e30,Ji=1e-5,es=v(`

	fn isMISWeightLight( lightType: i32 ) -> bool {

		return lightType == ${Ka} || lightType == ${Qa} || lightType == ${Ga};

	}

`),Nr=v(`

	fn getSpotAttenuation( coneCosine: f32, penumbraCosine: f32, angleCosine: f32 ) -> f32 {

		return smoothstep( coneCosine, penumbraCosine, angleCosine );

	}

`),Ma=v(`

	fn getDistanceAttenuation( lightDistance: f32, cutoffDistance: f32, decayExponent: f32 ) -> f32 {

		// based upon Frostbite 3 Moving to Physically-based Rendering
		// https://seblagarde.files.wordpress.com/2015/07/course_notes_moving_frostbite_to_pbr_v32.pdf
		var distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), EPSILON );
		if ( cutoffDistance > 0.0 ) {

			let window = clamp( 1.0 - pow( lightDistance / cutoffDistance, 4.0 ), 0.0, 1.0 );
			distanceFalloff *= window * window;

		}

		return distanceFalloff;

	}

`,[M]),wo=v(`

	fn intersectsRectangle( center: vec3f, normal: vec3f, u: vec3f, v: vec3f, rayOrigin: vec3f, rayDirection: vec3f ) -> f32 {

		let t = dot( center - rayOrigin, normal ) / dot( rayDirection, normal );
		if ( t > EPSILON ) {

			let p = rayOrigin + rayDirection * t;
			let vi = p - center;

			let a1 = dot( u, vi );
			if ( abs( a1 ) <= 0.5 ) {

				let a2 = dot( v, vi );
				if ( abs( a2 ) <= 0.5 ) {

					return t;

				}

			}

		}

		return - 1.0;

	}

`,[M]),So=v(`

	fn intersectsCircle( position: vec3f, normal: vec3f, u: vec3f, v: vec3f, rayOrigin: vec3f, rayDirection: vec3f ) -> f32 {

		let t = dot( position - rayOrigin, normal ) / dot( rayDirection, normal );
		if ( t > EPSILON ) {

			let hit = rayOrigin + rayDirection * t;
			let vi = hit - position;

			let a1 = dot( u, vi );
			let a2 = dot( v, vi );
			if ( length( vec2f( a1, a2 ) ) <= 0.5 ) {

				return t;

			}

		}

		return - 1.0;

	}

`,[M]),To=v(`

	fn randomAreaLightSample( light: Light, rayOrigin: vec3f, ruv: vec2f ) -> LightRecord {

		var randomPos = vec3f( 0.0 );
		if ( light.lightType == ${Ga} ) {

			randomPos = light.position + light.u * ( ruv.x - 0.5 ) + light.v * ( ruv.y - 0.5 );

		} else if ( light.lightType == ${Qa} ) {

			let r = 0.5 * sqrt( ruv.x );
			let theta = ruv.y * 2.0 * PI;
			randomPos = light.position + light.u * ( r * cos( theta ) ) + light.v * ( r * sin( theta ) );

		}

		let toLight = randomPos - rayOrigin;
		let lightDistSq = dot( toLight, toLight );
		let dist = sqrt( lightDistSq );
		let direction = toLight / dist;
		let lightNormal = normalize( cross( light.u, light.v ) );

		var lightRec: LightRecord;
		lightRec.lightType = light.lightType;
		lightRec.emission = light.color * light.intensity;
		lightRec.dist = dist;
		lightRec.direction = direction;

		// points behind or edge-on to the light receive no contribution
		let cosTheta = dot( direction, lightNormal );
		if ( cosTheta <= 0.0 ) {

			lightRec.pdf = 0.0;

		} else {

			lightRec.pdf = lightDistSq / ( light.area * cosTheta );

		}

		return lightRec;

	}

`,[Re,me,M]),Io=v(`

	fn randomSpotLightSample( light: Light, rayOrigin: vec3f, ruv: vec2f ) -> LightRecord {

		let radius = light.radius * sqrt( ruv.x );
		let theta = ruv.y * 2.0 * PI;
		let x = radius * cos( theta );
		let y = radius * sin( theta );

		let u = light.u;
		let v = light.v;
		let normal = normalize( cross( u, v ) );

		let angle = acos( light.coneCos );
		let angleTan = tan( angle );
		let startDistance = light.radius / max( angleTan, EPSILON );

		let randomPos = light.position - normal * startDistance + u * x + v * y;
		let toLight = randomPos - rayOrigin;
		let lightDistSq = dot( toLight, toLight );
		let dist = sqrt( lightDistSq );

		let direction = toLight / max( dist, EPSILON );
		let distanceAttenuation = getDistanceAttenuation( dist, light.distance, light.decay );

		var lightRec: LightRecord;
		lightRec.lightType = light.lightType;
		lightRec.dist = dist;
		lightRec.direction = direction;
		lightRec.emission = light.color * light.intensity * distanceAttenuation;
		lightRec.pdf = 1.0;

		return lightRec;

	}

`,[Re,me,M,Ma]),_o=v(`

	fn getSpotLightNearest( light: Light, position: vec3f ) -> vec2f {

		let normal = normalize( cross( light.u, light.v ) );
		let startDistance = light.radius / max( tan( acos( light.coneCos ) ), EPSILON );
		let discCenter = light.position - normal * startDistance;

		let toPosition = position - discCenter;
		let along = dot( toPosition, - normal );
		let across = max( length( toPosition + normal * along ) - light.radius, 0.0 );
		let dist = length( vec2f( along, across ) );
		return vec2f( along / max( dist, EPSILON ), dist );

	}

`,[Re,M]),Ro=1e-6,ts=1e-6,Ar=.999,we=new $({inside:"bool",object:"uint",extinction:"vec3f",albedo:"vec3f",anisotropy:"float"},"Medium"),qe=new $({extinction:"vec3f",object:"uint",albedo:"vec3f",anisotropy:"float",inside:"uint"},"MediumState"),Co=m`

	fn storeMedium( medium: ${we} ) -> ${qe} {

		var state: ${qe};
		state.extinction = medium.extinction;
		state.object = medium.object;
		state.albedo = medium.albedo;
		state.anisotropy = medium.anisotropy;
		state.inside = select( 0u, 1u, medium.inside );
		return state;

	}

`,as=m`

	fn loadMedium( state: ${qe} ) -> ${we} {

		var medium: ${we};
		medium.inside = state.inside != 0u;
		medium.object = state.object;
		medium.extinction = state.extinction;
		medium.albedo = state.albedo;
		medium.anisotropy = state.anisotropy;
		return medium;

	}

`,Do=m`

	fn singleScatterAlbedo( multiscatterAlbedo: vec3f, anisotropy: f32 ) -> vec3f {

		let a = multiscatterAlbedo;
		let s = clamp( 4.09712 + 4.20863 * a - sqrt( 9.59217 + 41.6808 * a + 17.7126 * a * a ), vec3f( 0.0 ), vec3f( 1.0 ) );
		let s2 = select( s * s, vec3f( 1.0 ), a <= vec3f( 0.0 ) );
		return ( 1.0 - s2 ) / ( 1.0 - anisotropy * s2 );

	}

`,rs=m`

	fn enterMedium( material: ${Pi}, object: u32 ) -> ${we} {

		let anisotropy = clamp( material.scatterAnisotropy, - ${Ar}, ${Ar} );

		var medium: ${we};
		medium.extinction = - log( max( material.attenuationColor, vec3f( ${Ro} ) ) ) / material.attenuationDistance;
		medium.albedo = ${Do}( material.multiscatterColor * material.scatterStrength, anisotropy );
		medium.inside = any( medium.albedo > vec3f( 0.0 ) ) && any( medium.extinction > vec3f( 0.0 ) );
		medium.object = object;
		medium.anisotropy = anisotropy;
		return medium;

	}

`,is=m`

	fn mediumChannelPdf( throughput: vec3f, albedo: vec3f ) -> vec3f {

		let weights = abs( throughput * albedo );
		let weightSum = weights.r + weights.g + weights.b;
		if ( weightSum > 0.0 ) {

			return weights / weightSum;

		}

		return vec3f( 1.0 / 3.0 );

	}

`,ss=m`

	fn sampleMediumDistance( medium: ${we}, channelPdf: vec3f, u: vec2f ) -> f32 {

		var channel = 2u;
		if ( u.x < channelPdf.r ) {

			channel = 0u;

		} else if ( u.x < channelPdf.r + channelPdf.g ) {

			channel = 1u;

		}

		// a channel with no extinction never scatters, and WGSL doesn't guarantee an infinite quotient
		let extinction = medium.extinction[ channel ];
		if ( extinction <= 0.0 ) {

			return ${Fe};

		}

		return - log( 1.0 - u.y ) / extinction;

	}

`,ns=m`

	fn mediumDistancePdf( medium: ${we}, dist: f32, scattered: bool ) -> vec3f {

		let transmittance = exp( - medium.extinction * dist );
		return select( transmittance, medium.extinction * transmittance, scattered );

	}

`,it=v(`

	fn ggxDirection( incidentDir: vec3f, alpha: vec2f, uv: vec2f ) -> vec3f {

		// Implementation from reference [1]
		// stretch view
		let V = normalize( vec3f( alpha * incidentDir.xy, incidentDir.z ) );

		// orthonormal basis
		var T1: vec3f;
		if ( V.z < 0.9999 ) {

			T1 = normalize( cross( V, vec3( 0.0, 0.0, 1.0 ) ) );

		} else {

			T1 = vec3( 1.0, 0.0, 0.0 );

		}

		let T2 = cross( T1, V );

		// sample point with polar coordinates (r, phi)
		let a = 1.0 / ( 1.0 + V.z );
		let r = sqrt( uv.x );
		var phi: f32;
		if ( uv.y < a ) {

			phi = uv.y / a * PI;

		} else {

			phi = PI + ( uv.y - a ) / ( 1.0 - a ) * PI;

		}

		let P1 = r * cos( phi );
		var P2 = r * sin( phi );
		if ( uv.y >= a ) {

			P2 *= V.z;

		}

		// compute normal
		var N = P1 * T1 + P2 * T2 + V * sqrt( max( 0.0, 1.0 - P1 * P1 - P2 * P2 ) );

		// unstretch
		N = normalize( vec3( alpha * N.xy, max( 0.0, N.z ) ) );

		return N;

	}

`,[M]),$o=v(`

	fn ggxLambda( V: vec3f, alpha: vec2f ) -> f32 {

		let alphaT = alpha.x;
		let alphaB = alpha.y;

		// abs v.z to support transmitted rays
		let NdotV = max( abs( V.z ), MIN_INCIDENT_COS );
		let cos2 = NdotV * NdotV;
		let t = ( alphaT * alphaT * V.x * V.x + alphaB * alphaB * V.y * V.y ) / cos2;
		let numerator = - 1.0 + sqrt( 1.0 + t );
		return numerator / 2.0;

	}

`,[M]),Xa=v(`

	fn ggxShadowMaskG1( V: vec3f, alpha: vec2f ) -> f32 {

		// TODO: this could be collapsed to a simpler form as an optimization
		return 1.0 / ( 1.0 + ggxLambda( V, alpha ) );

	}

`,[$o]),Mo=v(`

	fn ggxSmithVisibility( V: vec3f, L: vec3f, alpha: vec2f ) -> f32 {

		let alphaT = alpha.x;
		let alphaB = alpha.y;

		let NdotV = max( V.z, MIN_INCIDENT_COS );
		let NdotL = max( L.z, MIN_INCIDENT_COS );

		let TdotV = V.x;
		let TdotL = L.x;

		let BdotV = V.y;
		let BdotL = L.y;

		let GGXV = NdotL * length( vec3f( alphaT * TdotV, alphaB * BdotV, NdotV ) );
		let GGXL = NdotV * length( vec3f( alphaT * TdotL, alphaB * BdotL, NdotL ) );

		return 0.5 / ( GGXV + GGXL );

	}

`,[M]),ea=v(`

	fn ggxDistribution( H: vec3f, alpha: vec2f ) -> f32 {

		let alphaT = alpha.x;
		let alphaB = alpha.y;

		let NdotH = H.z;
		let TdotH = H.x;
		let BdotH = H.y;

		let a2 = alphaT * alphaB;
		let v = vec3f( alphaB * TdotH, alphaT * BdotH, a2 * NdotH );
		let v2 = dot( v, v );
		let w2 = a2 / v2;

		return a2 * w2 * w2 / PI;

	}

`,[M]),st=v(`

	fn ggxReflectionAdjustedPDF( V: vec3f, H: vec3f, alpha: vec2f ) -> f32 {

		let NdotV = max( V.z, MIN_INCIDENT_COS );
		let D = ggxDistribution( H, alpha );
		let G1 = ggxShadowMaskG1( V, alpha );

		return D * G1 / ( 4 * NdotV );

	}
`,[ea,Xa]),os=v(`

	fn ggxRefractionAdjustedPDF( V: vec3f, L: vec3f, H: vec3f, alpha: vec2f, eta: f32 ) -> f32 {

		let NdotV = max( V.z, MIN_INCIDENT_COS );
		let HdotV = dot( V, H );
		let HdotL = dot( L, H );
		let D = ggxDistribution( H, alpha );
		let G1 = ggxShadowMaskG1( V, alpha );

		let denom = eta * HdotV + HdotL;
		return D * G1 * abs( HdotV ) * abs( HdotL ) / ( NdotV * denom * denom );

	}
`,[ea,Xa]),Fo=m`

	fn ensureValidReflectionNormal( n: vec3f, ng: vec3f, i: vec3f ) -> vec3f {

		// reflected ray
		let R = 2.0 * dot( n, i ) * n - i;

		let Iz = dot( i, ng );

		// reflection rays may always be at least as shallow as the incoming ray
		let threshold = min( 0.9 * Iz, 0.01 );
		if ( dot( ng, R ) >= threshold ) {

			return n;

		}

		// Form coordinate system with Ng as the Z axis and N inside the X-Z-plane.
   		// The X axis is found by normalizing the component of N that's orthogonal to Ng.
   		// The Y axis isn't actually needed.
		let orthoN = n - dot( n, ng ) * ng;
		let orthoLen = length( orthoN );
		let X = select( n, orthoN / orthoLen, orthoLen != 0.0 );

		// Calculate N.z and N.x in the local coordinate system.
		//
		// The goal of this computation is to find a N' that is rotated towards Ng just enough
   		// to lift R' above the threshold (here called t), therefore dot(R', Ng) = t.
		//
		// See the Blender implementation for a full description of the solution.
		let Ix = dot( i, X );

		let a = Ix * Ix + Iz * Iz;
		let b = 2.0 * ( a + Iz * threshold );
		let c = ( threshold + Iz ) * ( threshold + Iz );

		// only one root is valid; the sign of Ix selects it
		var Nz2: f32;
		if ( Ix < 0.0 ) {

			Nz2 = 0.25 * ( b + sqrt( max( b * b - 4.0 * a * c, 0.0 ) ) ) / a;

		} else {

			Nz2 = 0.25 * ( b - sqrt( max( b * b - 4.0 * a * c, 0.0 ) ) ) / a;

		}

		let Nx = sqrt( max( 1.0 - Nz2, 0.0 ) );
		let Nz = sqrt( max( Nz2, 0.0 ) );

		return Nx * X + Nz * ng;

	}

`,Po=m`

	fn ensureValidViewNormal( n: vec3f, ng: vec3f, view: vec3f ) -> vec3f {

		// ensure the view is at least slightly above the surface normal hemisphere
		const MIN_VIEW_COS = 1e-6;

		// if we're positive already then early out
		let c = dot( n, view );
		if ( c > MIN_VIEW_COS ) {

			return n;

		}

		// perpendicular vector to normal and view
		var perp = n - c * view;
		let perpLen = length( perp );

		// if we reach here that means that he view is nearly the opposite direction and
		// we can't derive plan to rotate on towards the view, so just use the geometry
		// normal. This could likely only really happen with a severe normal map application.
		if ( perpLen <= 1e-6 ) {

			return ng;

		}

		perp = perp / perpLen;

		// rotate the normal to be at larger than the above threshold - pythagorean
		// theorem for generating normal with threshold*view component
		return MIN_VIEW_COS * view + sqrt( 1.0 - MIN_VIEW_COS * MIN_VIEW_COS ) * perp;

	}

`,ls=3402823466e29,Bo=(c,e,t)=>v(`

	fn getSurfaceRecord(
		material: Material,
		vertexData: bvh_GeometryStruct,
		side: f32,
		faceNormal: vec3f,
		view: vec3f,
		blurRoughness: f32,
	) -> SurfaceRecord {

		// "faceNormal" is provided on the hit side so flip it back to the geometric side
		var normal = faceNormal * side;
		if ( material.flatShading == 0 ) {

			normal = normalize( vertexData.normal.xyz );

		}

		var baseNormal = normal;
		if ( material.normalMap != -1 ) {

			// some provided tangents can be malformed (0, 0, 0) causing the normal to be degenerate
			// resulting in NaNs and slow path tracing.
			if ( length( vertexData.tangent.xyz ) > 0.0 && vertexData.tangent.w != 0.0 ) {

				// TODO: consider re-orthonormalizing against the normal here since attribute
				// interpolation could result in drift.
				let tangent = normalize( vertexData.tangent.xyz );
				let bitangent = normalize( cross( baseNormal, tangent ) * vertexData.tangent.w );
				let vTBN = mat3x3f( tangent, bitangent, baseNormal );

				let uvPrime = material.normalMapTransform * vec3( getUvFromChannel( vertexData, material.normalMap ), 1.0 );
				var texNormal = sampleTexel( uvPrime.xy, material.normalMap, 0 ).xyz;
				texNormal = texNormal * 2.0 - 1.0;
				texNormal = texNormal * vec3f( material.normalScale, 1.0 );
				normal = normalize( vTBN * texNormal );

			}

		}

		normal *= side;

		normal = ensureValidViewNormal( normal, faceNormal, view );

		normal = ensureValidReflectionNormal( normal, faceNormal, view );

		var albedo = vec4( material.color, material.opacity );
		if ( material.vertexColors == 1 ) {

			albedo *= getColor( vertexData );

		}

		if ( material.map != -1 ) {

			let uvPrime = material.mapTransform * vec3f( getUvFromChannel( vertexData, material.map ), 1 );
			albedo *= sampleTexel( uvPrime.xy, material.map, 0 );

		}

		if ( material.alphaMap != -1 ) {

			let uvPrime = material.alphaMapTransform * vec3f( getUvFromChannel( vertexData, material.alphaMap ), 1 );
			albedo.a *= sampleTexel( uvPrime.xy, material.alphaMap, 0 ).g;

		}

		var roughness = material.roughness;
		if ( material.roughnessMap != -1 ) {

			let uvPrime = material.roughnessMapTransform * vec3f( getUvFromChannel( vertexData, material.roughnessMap ), 1 );
			let texColor = sampleTexel( uvPrime.xy, material.roughnessMap, 0 );
			roughness *= texColor.g;

		}

		var metalness = material.metalness;
		if ( material.metalnessMap != -1 ) {

			let uvPrime = material.metalnessMapTransform * vec3f( getUvFromChannel( vertexData, material.metalnessMap ), 1 );
			let texColor = sampleTexel( uvPrime.xy, material.metalnessMap, 0 );
			metalness *= texColor.b;

		}

		var emission = material.emissiveIntensity * material.emissive;
		if ( material.emissiveMap != -1 ) {

			let uvPrime = material.emissiveMapTransform * vec3f( getUvFromChannel( vertexData, material.emissiveMap ), 1 );
			let texColor = sampleTexel( uvPrime.xy, material.emissiveMap, 0 );
			emission *= texColor.rgb;

		}

		var transmission = material.transmission;
		if ( material.transmissionMap != -1 ) {

			let uvPrime = material.transmissionMapTransform * vec3f( getUvFromChannel( vertexData, material.transmissionMap ), 1 );
			let texColor = sampleTexel( uvPrime.xy, material.transmissionMap, 0 );
			transmission *= texColor.r;

		}

		var clearcoat = material.clearcoat;
		if ( material.clearcoatMap != -1 ) {

			let uvPrime = material.clearcoatMapTransform * vec3f( getUvFromChannel( vertexData, material.clearcoatMap ), 1 );
			let texColor = sampleTexel( uvPrime.xy, material.clearcoatMap, 0 );
			clearcoat *= texColor.r;

		}

		var clearcoatRoughness = material.clearcoatRoughness;
		if ( material.clearcoatRoughnessMap != -1 ) {

			let uvPrime = material.clearcoatRoughnessMapTransform * vec3f( getUvFromChannel( vertexData, material.clearcoatRoughnessMap ), 1 );
			let texColor = sampleTexel( uvPrime.xy, material.clearcoatRoughnessMap, 0 );
			clearcoatRoughness *= texColor.g;

		}

		var clearcoatNormal = baseNormal;
		if ( material.clearcoatNormalMap != -1 ) {

			// some provided tangents can be malformed (0, 0, 0) causing the normal to be degenerate
			// resulting in NaNs and slow path tracing.
			if ( length( vertexData.tangent.xyz ) > 0.0 && vertexData.tangent.w != 0.0 ) {

				// TODO: consider re-orthonormalizing against the normal here since attribute
				// interpolation could result in drift.
				let tangent = normalize( vertexData.tangent.xyz );
				let bitangent = normalize( cross( baseNormal, tangent ) * vertexData.tangent.w );
				let vTBN = mat3x3f( tangent, bitangent, baseNormal );

				let uvPrime = material.clearcoatNormalMapTransform * vec3( getUvFromChannel( vertexData, material.clearcoatNormalMap ), 1.0 );
				var texNormal = sampleTexel( uvPrime.xy, material.clearcoatNormalMap, 0 ).xyz;
				texNormal = texNormal * 2.0 - 1.0;
				texNormal = texNormal * vec3f( material.clearcoatNormalScale, 1.0 );
				clearcoatNormal = normalize( vTBN * texNormal );

			}

		}

		clearcoatNormal *= side;

		clearcoatNormal = ensureValidViewNormal( clearcoatNormal, faceNormal, view );

		clearcoatNormal = ensureValidReflectionNormal( clearcoatNormal, faceNormal, view );

		var sheenColor = material.sheenColor;
		if ( material.sheenColorMap != -1 ) {

			let uvPrime = material.sheenColorMapTransform * vec3f( getUvFromChannel( vertexData, material.sheenColorMap ), 1 );
			let texColor = sampleTexel( uvPrime.xy, material.sheenColorMap, 0 );
			sheenColor *= texColor.rgb;

		}

		var sheenRoughness = material.sheenRoughness;
		if ( material.sheenRoughnessMap != -1 ) {

			let uvPrime = material.sheenRoughnessMapTransform * vec3f( getUvFromChannel( vertexData, material.sheenRoughnessMap ), 1 );
			let texColor = sampleTexel( uvPrime.xy, material.sheenRoughnessMap, 0 );
			sheenRoughness *= texColor.r;

		}

		var iridescence = material.iridescence;
		if ( material.iridescenceMap != -1 ) {

			let uvPrime = material.iridescenceMapTransform * vec3f( getUvFromChannel( vertexData, material.iridescenceMap ), 1 );
			let texColor = sampleTexel( uvPrime.xy, material.iridescenceMap, 0 );
			iridescence *= texColor.r;

		}

		var iridescenceThickness = material.iridescenceThicknessMaximum;
		if ( material.iridescenceThicknessMap != -1 ) {

			let uvPrime = material.iridescenceThicknessMapTransform * vec3f( getUvFromChannel( vertexData, material.iridescenceThicknessMap ), 1 );
			let texColor = sampleTexel( uvPrime.xy, material.iridescenceThicknessMap, 0 );

			iridescenceThickness = mix(
				material.iridescenceThicknessMinimum,
				material.iridescenceThicknessMaximum,
				texColor.g,
			);

		}

		var specularColor = material.specularColor;
		if ( material.specularColorMap != -1 ) {

			let uvPrime = material.specularColorMapTransform * vec3f( getUvFromChannel( vertexData, material.specularColorMap ), 1 );
			let texColor = sampleTexel( uvPrime.xy, material.specularColorMap, 0 );
			specularColor *= texColor.rgb;

		}

		var specularIntensity = material.specularIntensity;
		if ( material.specularIntensityMap != -1 ) {

			let uvPrime = material.specularIntensityMapTransform * vec3f( getUvFromChannel( vertexData, material.specularIntensityMap ), 1 );
			let texColor = sampleTexel( uvPrime.xy, material.specularIntensityMap, 0 );
			specularIntensity *= texColor.a;

		}

		// extract the anisotropy magnitude vector in tangent space
		var anisotropyDirVec = material.anisotropy * vec2f( cos( material.anisotropyRotation ), sin( material.anisotropyRotation ) );
		if ( material.anisotropyMap != -1 ) {

			let uvPrime = material.anisotropyMapTransform * vec3f( getUvFromChannel( vertexData, material.anisotropyMap ), 1.0 );
			let aniTex = sampleTexel( uvPrime.xy, material.anisotropyMap, 0 );

			// map rg encode the direction ([-1,1]), b the strength; rotate + scale by the material anisotropy.
			let mapDir = aniTex.rg * 2.0 - vec2f( 1.0 );
			let mapStr = aniTex.b;
			let mapLen = length( mapDir );
			if ( mapLen > EPSILON ) {

				anisotropyDirVec = mat2x2f(
					anisotropyDirVec.x, anisotropyDirVec.y,
					- anisotropyDirVec.y, anisotropyDirVec.x
				) * mapStr * mapDir / mapLen;

			}

		}

		// adjust the surface basis to be oriented along the anisotropic vector
		let anisotropyStrength = length( anisotropyDirVec );
		var surfaceBasis = getBasisFromNormal( normal );
		if ( anisotropyStrength > 0.0 && length( vertexData.tangent.xyz ) > 0.0 && vertexData.tangent.w != 0.0 ) {

			let anisotropyDir = anisotropyDirVec / anisotropyStrength;

			// re-orthonormalize the tangent against the shading normal so the frame stays orthonormal -
			// normal map adjustments will cause the normal and tangent to become non-orthonormal.
			let tangent = normalize( vertexData.tangent.xyz - normal * dot( normal, vertexData.tangent.xyz ) );
			let bitangent = cross( normal, tangent ) * vertexData.tangent.w;

			surfaceBasis = mat3x3f(
				tangent * anisotropyDir.x + bitangent * anisotropyDir.y,
				bitangent * anisotropyDir.x - tangent * anisotropyDir.y,
				normal
			);

		}

		var surf: SurfaceRecord;

		surf.volumeParticle = false;
		surf.faceNormal = faceNormal;
		surf.normal = normal;

		surf.metalness = metalness;
		surf.diffuseRoughness = material.diffuseRoughness;
		surf.color = albedo.rgb;
		surf.emission = emission;

		surf.opacity = select( 1.0, albedo.a, material.transparent != 0 );

		surf.ior = material.ior;
		surf.transmission = transmission;
		surf.thinWall = material.thinWall == 1;
		surf.attenuationColor = material.attenuationColor;
		surf.attenuationDistance = material.attenuationDistance;

		surf.clearcoatNormal = clearcoatNormal;
		surf.clearcoat = clearcoat;

		surf.iridescence = iridescence;
		surf.iridescenceIor = material.iridescenceIor;
		surf.iridescenceThickness = iridescenceThickness;

		surf.specularColor = specularColor;
		surf.specularIntensity = specularIntensity;

		surf.sheen = material.sheen;
		surf.sheenColor = sheenColor;

		let minRoughness = max( MIN_ROUGHNESS, blurRoughness );
		surf.roughness = clamp( roughness, minRoughness, 1.0 );
		surf.clearcoatRoughness = clamp( clearcoatRoughness, minRoughness, 1.0 );
		surf.sheenRoughness = clamp( sheenRoughness, minRoughness, 1.0 );
		surf.anisotropy = anisotropyStrength;

		// frontFace is used to determine transmissive properties and PDF. If no transmission is used
		// then we can just always assume this is a front face.
		surf.frontFace = side == 1.0 || transmission == 0.0;
		if ( material.thinWall == 1 || surf.frontFace ) {

			surf.eta = 1.0 / material.ior;

		} else {

			surf.eta = material.ior;

		}
		surf.f0 = iorToF0( surf.eta );

		// get the normal frames
		surf.normalBasis = surfaceBasis;
		surf.normalInvBasis = inverse( surf.normalBasis );

		surf.clearcoatBasis = getBasisFromNormal( surf.clearcoatNormal );
		surf.clearcoatInvBasis = inverse( surf.clearcoatBasis );

		return surf;
	}

`,[oo,le,lo,c,e,t,Q,M,Fo,Po]);v(`

	fn diffuseBrdf( NdotV: f32, NdotL: f32, VdotH: f32, surf: SurfaceRecord ) -> vec3f {

		// https://blog.selfshadow.com/publications/s2015-shading-course/burley/s2015_pbs_disney_bsdf_notes.pdf
		// See equation (4)

		let fl = schlickFresnel( NdotL, 0.0 );
		let fv = schlickFresnel( NdotV, 0.0 );

		let alpha = surf.roughness * surf.roughness;
		let bias = mix( 0.0, 0.5, alpha ) - 1;
		let energyFactor = mix( 1.0, 1.0 / 1.51, alpha );

		let rr = 2.0 * alpha * VdotH * VdotH;
		let retro = rr * ( fl + fv + fl * fv * ( rr + 2.0 * bias ) );
		let fresnel = ( 1.0 + bias * fl ) * ( 1.0f + bias * fv );

		// TODO: subsurface approx?

		return energyFactor * ( surf.color / PI ) * ( retro + fresnel );

	}

`,[M,Ae,Q]);v(`

	fn lambertBrdf( NdotV: f32, NdotL: f32, VdotH: f32, surf: SurfaceRecord ) -> vec3f {

		return surf.color / PI;

	}

`,[M,Q]);const cs=v(`

	fn specularBrdf( V: vec3f, L: vec3f, H: vec3f, alpha: vec2f ) -> vec3f {

		let alphaT = alpha.x;
		let alphaB = alpha.y;

		let Vis = ggxSmithVisibility( V, L, alpha );
		let D = ggxDistribution( H, alpha );

		return vec3f( D * Vis );

	}

`,[Mo,ea]),ut=v(`

	fn isMatchedIor( eta: f32 ) -> bool {

		return abs( eta - 1.0 ) < EPSILON;

	}

`,[M]),us=v(`

	fn specularBtdf( V: vec3f, L: vec3f, H: vec3f, alpha: vec2f, eta: f32 ) -> vec3f {

		let NdotV = V.z;
		let NdotL = L.z;
		let HdotV = dot( V, H );
		let HdotL = dot( L, H );

		// Heaviside function for G term
		if ( NdotV * HdotV < 0.0 || NdotL * HdotL < 0.0 || HdotV * HdotL > 0.0 ) {

			return vec3f( 0.0 );

		}

		let G1_i = ggxShadowMaskG1( V, alpha );
		let G1_o = ggxShadowMaskG1( L, alpha );

		// separable G2 product, no height correlation
		let denom = eta * HdotV + HdotL;
		let Vis = G1_i * G1_o * abs( HdotV ) * abs( HdotL ) /
			( abs( NdotV ) * abs( NdotL ) * denom * denom );

		let F = dielectricFresnel( abs( HdotV ), eta );

		let D = ggxDistribution( H, alpha );

		return vec3f( ( 1 - F ) * D * Vis );

	}

`,[Xa,ea,vt]),fa=v(`

	fn thinWallTransmissionRoughness( alpha: f32, eta: f32 ) -> f32 {

		let t = 3.4 * ( eta - 1.0 ) * ( eta - 0.5 ) * ( eta - 0.5 ) / ( eta * eta * eta );
		return saturate( alpha * sqrt( max( t, 0.0 ) ) );

	}

`),ds=v(`

	fn transmissionAttenuation( dist: f32, attColor: vec3f, attDist: f32 ) -> vec3f {

		return pow( attColor, vec3f( dist / attDist ) );

	}

`),ta=360,aa=830,No=v(`

	fn dispersionIor( ior: f32, dispersion: f32, wavelength: f32 ) -> f32 {

		let nd = max( ior, 1.0 );
		let scale = ( nd - 1.0 ) * max( dispersion, 0.0 ) / 20.0;
		let lambda = clamp( wavelength, ${ta}.0, ${aa}.0 );
		return max( nd + scale * ( 523655.0 / ( lambda * lambda ) - 1.5168 ), 1.0 );

	}

`),hs=m`

	fn applyDispersion( surf: ptr<function, ${Q}>, dispersion: f32, wavelength: f32 ) -> void {

		surf.ior = ${No}( surf.ior, dispersion, wavelength );
		surf.eta = select( surf.ior, 1.0 / surf.ior, surf.thinWall || surf.frontFace );
		surf.f0 = ${le}( surf.eta );

	}

`,fs=v(`

	fn dispersionColorWeight( wavelength: f32 ) -> vec3f {

		let lambda = clamp( wavelength, ${ta}.0, ${aa}.0 );

		let x1 = ( lambda - 442.0 ) * select( 0.0374, 0.0624, lambda < 442.0 );
		let x2 = ( lambda - 599.8 ) * select( 0.0323, 0.0264, lambda < 599.8 );
		let x3 = ( lambda - 501.1 ) * select( 0.0382, 0.0490, lambda < 501.1 );
		let x = 0.362 * exp( - 0.5 * x1 * x1 ) + 1.056 * exp( - 0.5 * x2 * x2 ) - 0.065 * exp( - 0.5 * x3 * x3 );

		let y1 = ( lambda - 568.8 ) * select( 0.0247, 0.0213, lambda < 568.8 );
		let y2 = ( lambda - 530.9 ) * select( 0.0322, 0.0613, lambda < 530.9 );
		let y = 0.821 * exp( - 0.5 * y1 * y1 ) + 0.286 * exp( - 0.5 * y2 * y2 );

		let z1 = ( lambda - 437.0 ) * select( 0.0278, 0.0845, lambda < 437.0 );
		let z2 = ( lambda - 459.0 ) * select( 0.0725, 0.0385, lambda < 459.0 );
		let z = 1.217 * exp( - 0.5 * z1 * z1 ) + 0.681 * exp( - 0.5 * z2 * z2 );

		let linearRgb = max( vec3f(
			3.2404542 * x - 1.5371385 * y - 0.4985314 * z,
			- 0.9692660 * x + 1.8760108 * y + 0.0415560 * z,
			0.0556434 * x - 0.2040259 * y + 1.0572252 * z,
		), vec3f( 0.0 ) );

		return linearRgb * vec3f( 2.6699448, 4.0708066, 4.2980494 );

	}

`),Ao=v(`

	fn fresnelMix( VdotH: f32, f0Color: vec3f, ior: f32, eta: f32, weight: f32, base: vec3f, layer: vec3f ) -> vec3f {

		var f0 = iorToF0( ior ) * f0Color;
		f0 = min( f0, vec3f( 1.0 ) );

		// reflect all light on total internal reflection, matching the WebGL evaluateFresnel function
		var fr = vec3f( 1.0 );
		if ( ! totalInternalReflection( abs( VdotH ), eta ) ) {

			fr = schlickFresnelVec( abs( VdotH ), f0, vec3f( 1.0 ) );

		}

		let maxFr = max( max( fr.r, fr.g ), fr.b );

		return ( 1.0 - weight * maxFr ) * base + weight * fr * layer;

	}

`,[Jt,le,qa]),Lo=Os(3.2404542,-.969266,.0556434,-1.5371385,1.8760108,-.2040259,-.4985314,.041556,1.0572252),ko=m`

	fn evalSensitivity( OPD: f32, shift: vec3f ) -> vec3f {

		let phase = 2.0 * ${Math.PI} * OPD * 1.0e-9;
		const val = vec3(5.4856e-13, 4.4201e-13, 5.2481e-13);
		const pos = vec3(1.6810e+06, 1.7953e+06, 2.2084e+06);
		const _var = vec3(4.3278e+09, 9.3046e+09, 6.6121e+09);

		var xyz = val * sqrt(2.0 * ${Math.PI} * _var) * cos(pos * phase + shift) * exp(-phase * phase * _var);
		xyz.x += 9.7470e-14 * sqrt(2.0 * ${Math.PI} * 4.5282e+09) * cos(2.2399e+06 * phase + shift.x) * exp(-4.5282e+09 * phase * phase);
		xyz /= 1.0685e-7;

		let rgb = ${Lo} * xyz;
		return rgb;

	}

`,ms=v(`

	fn iridescentFresnel(
		cosTheta1: f32, baseF0: vec3f, iridescenceIor: f32,
		outsideIor: f32, iridescenceThickness: f32,
	) -> vec3f {

		let sinTheta2Sq = pow( outsideIor / iridescenceIor, 2.0 ) * ( 1.0 - pow( cosTheta1, 2.0 ) );
		let cosTheta2Sq = 1.0 - sinTheta2Sq;

		// Handle total internal reflection
		if ( cosTheta2Sq < 0.0 ) {

			return vec3( 1.0 );

		}

		let cosTheta2 = sqrt( cosTheta2Sq );

		// First interface: air -> iridescent thin film
		let R0 = iorToF0General( iridescenceIor, outsideIor );
		let R12 = schlickFresnel( cosTheta1, R0 );
		let R21 = R12;
		let T121 = 1.0 - R12;
		let phi12 = select( 0.0, PI, iridescenceIor < outsideIor );
		let phi21 = PI - phi12;

		// Second interface: iridescent thin film -> base material
		let baseIor = fresnel0ToIor( clamp( baseF0, vec3( 0.0 ), vec3( 0.9999 ) ) ); // guard against 1.0
		let R1 = iorToF0GeneralVec( baseIor, vec3( iridescenceIor ) );
		var R23 = schlickFresnelVec( cosTheta2, R1, vec3( 1.0 ) );

		// Handle total internal reflection at the film -> base interface
		// NOTE: Added separately from the original implementation. Is this correct?
		R23 = select( R23, vec3( 1.0 ), totalInternalReflectionVec( cosTheta2, vec3( iridescenceIor ) / baseIor ) );
		let phi23 = select( vec3( 0.0 ), vec3( PI ), baseIor < vec3( iridescenceIor ) );

		// Phase shift
		let OPD = 2.0 * iridescenceIor * iridescenceThickness * cosTheta2;
		let phi = vec3( phi21 ) + phi23;

		// Analytical integration
		// Compound terms
		let R123 = clamp( R12 * R23, vec3( 1e-5 ), vec3( 0.9999 ) );
		let r123 = sqrt( R123 );
		let Rs = T121 * T121 * R23 / ( vec3( 1.0 ) - R123 );

		// Reflectance term for m = 0 (DC term amplitude)
		let C0 = R12 + Rs;
		var I = C0;

		// Reflectance term for m > 0 (pairs of diracs)
		var Cm = Rs - T121;
		for (var m = 1; m <= 2; m += 1) {

			Cm *= r123;
			let Sm = 2.0 * evalSensitivity( f32( m ) * OPD, f32( m ) * phi );
			I += Cm * Sm;

		}

		return max( I, vec3(0.0) );

	}

`,[co,uo,Ae,ho,ko,fo]),Eo=(c=ms)=>m`

	fn transmissionFresnel( cosTheta: f32, surf: ${Q} ) -> ${Ir} {

		var result: ${Ir};
		let cosine = saturate( abs( cosTheta ) );
		let matchedIor = ${ut}( surf.eta );
		let airIncident = surf.thinWall || surf.frontFace;
		let dielectricFresnel = ${vt}( cosine, surf.eta );

		// Keep matched media transparent unless a real thin-film layer is present. This avoids
		// introducing the non-physical Schlick F90 reflection produced by KHR_materials_specular
		// when the substrate itself has no IOR boundary.
		var reflectance = vec3f( 0.0 );
		if ( ! matchedIor ) {

			let specularF0 = min( surf.f0 * surf.specularColor, vec3f( 1.0 ) );
			let dielectricReflectance = select(
				vec3f( dielectricFresnel ),
				${Jt}( cosine, specularF0, vec3f( 1.0 ) ),
				airIncident,
			);
			reflectance = surf.specularIntensity * dielectricReflectance;

		}

		reflectance = clamp( reflectance, vec3f( 0.0 ), vec3f( 1.0 ) );
		var transmittance = vec3f( 1.0 ) - reflectance;

		if ( surf.iridescence > 0.0 ) {

			// The media on either side of the film are air outside and the volume interior as
			// the base. Swap them on interior hits so film-interface TIR remains possible.
			let outsideIor = select( surf.ior, 1.0, airIncident );
			let filmBaseIor = select( 1.0, surf.ior, airIncident );
			let filmReflectance = clamp( ${c}(
				cosine,
				vec3f( ${le}( filmBaseIor ) ),
				surf.iridescenceIor,
				outsideIor,
				surf.iridescenceThickness,
			), vec3f( 0.0 ), vec3f( 1.0 ) );

			reflectance = mix( reflectance, filmReflectance, surf.iridescence );
			transmittance = mix( transmittance, vec3f( 1.0 ) - filmReflectance, surf.iridescence );

		}

		result.reflectance = reflectance;
		result.transmittance = transmittance;

		// Include the base-color tint in the transmission energy, as Cycles does when it
		// computes the glass reflection probability from its two tinted coefficients.
		let reflectEnergy = dot( reflectance, vec3f( 1.0 / 3.0 ) );
		let transmissionTint = select( sqrt( surf.color ), surf.color, surf.thinWall );
		let transmitEnergy = dot( transmittance * transmissionTint, vec3f( 1.0 / 3.0 ) );
		let totalEnergy = reflectEnergy + transmitEnergy;
		result.reflectProbability = select( 0.0, reflectEnergy / max( totalEnergy, EPSILON ), totalEnergy > EPSILON );

		return result;

	}

`,zo=v(`

	fn conductorFresnel( VdotH: f32, f0: vec3f, specular: vec3f ) -> vec3f {

		return specular * schlickFresnelVec( abs( VdotH ), f0, vec3f( 1 ) );

	}

`,[Jt]),Ho=v(`

	fn fresnelCoat( VdotNc: f32, ior: f32, base: vec3f, layer: vec3f, weight: f32 ) -> vec3f {

		let f0 = iorToF0( ior );
		let F = schlickFresnel( abs( VdotNc ), f0 );

		return mix( base, layer, weight * F );

	}

`,[le,Ae]),Oo=c=>m`

	fn albedo(
		eta: f32,
		includeFresnel: bool,
		includeRefraction: bool,
		globalId: vec3u,
		layer: u32,
	) -> void {

		// The matched-IOR limit is a unit-energy delta transmission event, so it cannot
		// be integrated with the rough BTDF below.
		if ( includeRefraction && ${ut}( eta ) ) {

			textureStore( ${c}, vec3( globalId.xy, layer ), vec4( 1.0 ) );
			return;

		}

		// sample the brdf directions in a grid pattern
		const GRID_SIZE = 64u;

		// TODO: this sampling means that energy at 0.0 & 1.0 roughness (and 0 and 90deg cos) are never
		// written to the texture due to the half texel inset, resulting in small, though possibly noticeable,
		// error in common cases.
		let dimensions = textureDimensions( ${c} ).xy;
		let uv = ( vec2f( globalId.xy ) + vec2f( 0.5 ) ) / vec2f( dimensions );

		let cosThetaO = uv.x;
		let roughness = uv.y;
		let alpha = roughness * roughness;

		let wo = vec3( sqrt( 1 - cosThetaO * cosThetaO ), 0 , cosThetaO );

		let f0 = ${le}( eta );

		var result = 0.0;
		for ( var x = 0u; x < GRID_SIZE; x++ ) {

			for ( var y = 0u; y < GRID_SIZE; y++ ) {

				// calculate the half vector to sample
				let gridPoint = vec2f( vec2u( x, y ) ) + vec2f( 0.5 );
				let sampleUv = gridPoint / f32( GRID_SIZE );
				let wh = ${it}( wo, vec2( alpha ), sampleUv );

				var f = 1.0;
				if ( includeFresnel ) {

					// use the exact dielectric fresnel so the table agrees with the fresnel used
					// for lobe sampling
					f = ${vt}( dot( wo, wh ), eta );

				}

				// air-incident reflection is evaluated with schlick in bsdfEval - only the
				// volume-incident ( TIR ) glass reflection uses the exact fresnel
				var reflectionF = f;
				if ( eta < 1.0 ) {

					reflectionF = ${Ae}( dot( wo, wh ), f0 );

				}

				// reflection lobe - samples landing below the surface are lost
				let wi = - reflect( wo, wh );
				let reflectionPdf = ${st}( wo, wh, vec2f( alpha ) );
				if ( wi.z > 0.0 && reflectionPdf != 0.0 ) {

					let specular = ${cs}( wo, wi, wh, vec2f( alpha ) );
					result += reflectionF * specular.x * wi.z / reflectionPdf;

				}

				// refraction lobe - the btdf carries its own ( 1 - F ) fresnel weight, and
				// samples landing back above the surface are lost
				if ( includeRefraction ) {

					let wiRefract = refract( - wo, wh, eta );
					if ( wiRefract.z < 0.0 ) {

						let transmission = ${us}( wo, wiRefract, wh, vec2f( alpha ), eta );
						let pdf = ${os}( wo, wiRefract, wh, vec2f( alpha ), eta );
						if ( pdf != 0.0 ) {

							result += transmission.x * abs( wiRefract.z ) / pdf;

						}

					}

				}

			}

		}

		result /= f32( GRID_SIZE * GRID_SIZE );

		textureStore( ${c}, vec3( globalId.xy, layer ), vec4( result ) );

	}

`,yt=pt(`

	struct PcgState {
		s0: vec4u,
		s1: vec4u,
	};

	var<private> g_state: PcgState;
`),Vo=v(`
	fn pcgInitialize( pixel: vec2u, pathIndex: u32, bounceIndex: u32 ) -> void {

		// white noise seed
		g_state.s0 = vec4u( pixel | vec2( bounceIndex << 16 ), pathIndex, pixel.x + pixel.y);

		// blue noise seed
		g_state.s1 = vec4u( pathIndex, pathIndex * 15843, pathIndex * 31 + 4566, pathIndex * 2345 + 58585 );

	}
`,[yt]),ra=v(`
	fn pcg4d( v: ptr<private, vec4u> ) -> void {

		*v = *v * 1664525u + 1013904223u;
		*v = *v + v.yzxy * v.wxyz;
		*v = *v ^ ( *v >> vec4u( 16u ) );
		*v = *v + v.yzxy * v.wxyz;
	}
`),Wo=v(`
	fn pcgRand( _id: u32 ) -> f32 {

		pcg4d( &g_state.s0 );
		return abs( f32( g_state.s0.x ) / f32( 0xffffffffu ) );

	}
`,[ra,yt]),Uo=v(`
	fn pcgRand2( _id: u32 ) -> vec2f {

		pcg4d( &g_state.s0 );
		return abs( vec2f( g_state.s0.xy ) / f32( 0xffffffffu ) );

	}
`,[ra,yt]),qo=v(`
	fn pcgRand3( _id: u32 ) -> vec3f {

		pcg4d( &g_state.s0 );
		return abs( vec3f( g_state.s0.xyz ) / f32( 0xffffffffu ) );

	}
`,[ra,yt]),jo=v(`
	fn pcgRand4( _id: u32 ) -> vec4f {

		pcg4d( &g_state.s0 );
		return abs( vec4f( g_state.s0 ) / f32( 0xffffffffu ) );

	}
`,[ra,yt]),Go=v("fn noop() -> void {}"),Qo=Object.freeze(Object.defineProperty({__proto__:null,rand1:Wo,rand2:Uo,rand3:qo,rand4:jo,rngInit:Vo,rngNextBounce:Go},Symbol.toStringTag,{value:"Module"}));function Ko(c,e=Math.random){for(let t=c.length-1;t>0;t--){const a=~~((e()-1e-6)*t),r=c[t];c[t]=c[a],c[a]=r}}function Xo(c,e){c.fill(0);for(let t=0;t<e;t++)c[t]=1}class Lr{constructor(e){this.count=0,this.size=-1,this.sigma=-1,this.radius=-1,this.lookupTable=null,this.score=null,this.binaryPattern=null,this.resize(e),this.setSigma(1.5)}findVoid(){const{score:e,binaryPattern:t}=this;let a=1/0,r=-1;for(let s=0,i=t.length;s<i;s++){if(t[s]!==0)continue;const o=e[s];o<a&&(a=o,r=s)}return r}findCluster(){const{score:e,binaryPattern:t}=this;let a=-1/0,r=-1;for(let s=0,i=t.length;s<i;s++){if(t[s]!==1)continue;const o=e[s];o>a&&(a=o,r=s)}return r}setSigma(e){if(e===this.sigma)return;const t=~~(Math.sqrt(10*2*e**2)+1),a=2*t+1,r=new Float32Array(a*a),s=e*e;for(let i=-t;i<=t;i++)for(let o=-t;o<=t;o++){const l=(t+o)*a+i+t,u=i*i+o*o;r[l]=Math.E**(-u/(2*s))}this.lookupTable=r,this.sigma=e,this.radius=t}resize(e){this.size!==e&&(this.size=e,this.score=new Float32Array(e*e),this.binaryPattern=new Uint8Array(e*e))}invert(){const{binaryPattern:e,score:t,size:a}=this;t.fill(0);for(let r=0,s=e.length;r<s;r++)if(e[r]===0){const i=~~(r/a),o=r-i*a;this.updateScore(o,i,1),e[r]=1}else e[r]=0}updateScore(e,t,a){const{size:r,score:s,lookupTable:i}=this,o=this.radius,l=2*o+1;for(let u=-o;u<=o;u++)for(let n=-o;n<=o;n++){const h=(o+n)*l+u+o,f=i[h];let p=e+u;p=p<0?r+p:p%r;let d=t+n;d=d<0?r+d:d%r;const g=d*r+p;s[g]+=a*f}}addPointIndex(e){this.binaryPattern[e]=1;const t=this.size,a=~~(e/t),r=e-a*t;this.updateScore(r,a,1),this.count++}removePointIndex(e){this.binaryPattern[e]=0;const t=this.size,a=~~(e/t),r=e-a*t;this.updateScore(r,a,-1),this.count--}copy(e){this.resize(e.size),this.score.set(e.score),this.binaryPattern.set(e.binaryPattern),this.setSigma(e.sigma),this.count=e.count}}class Yo{constructor(){this.random=Math.random,this.sigma=1.5,this.size=64,this.majorityPointsRatio=.1,this.samples=new Lr(1),this.savedSamples=new Lr(1)}generate(){const{samples:e,savedSamples:t,sigma:a,majorityPointsRatio:r,size:s}=this;e.resize(s),e.setSigma(a);const i=Math.floor(s*s*r),o=e.binaryPattern;Xo(o,i),Ko(o,this.random);for(let h=0,f=o.length;h<f;h++)o[h]===1&&e.addPointIndex(h);for(;;){const h=e.findCluster();e.removePointIndex(h);const f=e.findVoid();if(h===f){e.addPointIndex(h);break}e.addPointIndex(f)}const l=new Uint32Array(s*s);t.copy(e);let u;for(u=e.count-1;u>=0;){const h=e.findCluster();e.removePointIndex(h),l[h]=u,u--}const n=s*s;for(u=t.count;u<n/2;){const h=t.findVoid();t.addPointIndex(h),l[h]=u,u++}for(t.invert();u<n;){const h=t.findCluster();t.removePointIndex(h),l[h]=u,u++}return{data:l,maxValue:n}}}function Zo(c){return c>=3?4:c}function Jo(c){switch(c){case 1:return Ia;case 2:return nn;default:return ae}}class el extends K{constructor(e=64,t=1){super(new Float32Array(4),1,1,ae,Be),this.minFilter=ht,this.magFilter=ht,this.size=e,this.channels=t,this.update()}update(){const e=this.channels,t=this.size,a=new Yo;a.channels=e,a.size=t;const r=Zo(e),s=Jo(r);(this.image.width!==t||s!==this.format)&&(this.image.width=t,this.image.height=t,this.image.data=new Float32Array(t**2*r),this.format=s,this.dispose());const i=this.image.data;for(let o=0,l=e;o<l;o++){const u=a.generate(),n=u.data,h=u.maxValue;for(let f=0,p=n.length;f<p;f++){const d=n[f]/h;i[f*r+o]=d}}this.needsUpdate=!0}}const ps=64,tl=new el(ps,1),al=te(tl),gs=ri(0).toVar("blueDitherSeed"),rl=m`
	fn blueDitherInitialize( pixel: vec2u, pathIndex: u32, bounceIndex: u32 ) -> void {

		let coord = vec2i( pixel % vec2u( ${ps}u ) );
		${gs} = textureLoad( ${al}, coord, 0 );
		${Va}( vec2u( 0 ), pathIndex, bounceIndex );

	}
`,il=m`
	fn blueDitherNextBounce() -> void {

		${Wa}();

	}
`,ia=m`
	fn blueDitherRand4( effect: u32 ) -> vec4f {

		// Get the scrambled sobol stratified sample
		let stratifiedSample = ${Oa}( effect );

		// offset it by the blue noise seed and dimension rotation
		return fract( stratifiedSample + ${gs}.r );

	}
`,sl=m`
	fn blueDitherRand3( effect: u32 ) -> vec3f {

		return ${ia}( effect ).xyz;

	}
`,nl=m`
	fn blueDitherRand2( effect: u32 ) -> vec2f {

		return ${ia}( effect ).xy;

	}
`,ol=m`
	fn blueDitherRand1( effect: u32 ) -> f32 {

		return ${ia}( effect ).x;

	}
`,ll=Object.freeze(Object.defineProperty({__proto__:null,rand1:ol,rand2:nl,rand3:sl,rand4:ia,rngInit:rl,rngNextBounce:il},Symbol.toStringTag,{value:"Module"})),kc=Qo,cl=io,Ec=ll,xs=0,Ya=1,vs=2,ul=2147483648,Za=1073741824,ft=1073741823;class dl extends k{constructor(){const e={material:{value:null},envInfo:{value:null},lightsInfo:{value:null},prevOutputTarget:j(We()).toReadOnly(),outputTarget:j(We()).toWriteOnly(),sampleCountTarget:j(Yt()).toReadWrite(),offset:w(new V),tileSize:w(new V),seed:w(0),maxBounces:w(5),maxTransparentBounces:w(5,"uint"),maxSubsurfaceBounces:w(256,"uint"),misEnabled:w(1,"uint"),maxSamples:w(0,"uint"),filterGlossy:w(1),clampDirect:w(0),clampIndirect:w(10),backgroundInfo:{value:null},transmissiveBackground:w(Ya),accumulateAux:w(0,"uint"),auxTarget:j(Ue()).toReadWrite(),textures:te(new K),textureSampler:Gt(new K),globalId:W},t=ee("bvhData.fns.raycastFirstHit.outputType"),a=q("bvhData.fns.raycastFirstHit"),r=q("bvhData.fns.raycastShadow"),s=q("bvhData.fns.sampleTrianglePoint"),i=q("bvhData.fns.getSurfaceRecord"),o=q("bvhData.fns.getCameraRay"),l=B("material.value.bsdfSample",e),u=B("material.value.bsdfEvalPdf",e),n=ee("bvhData.storage.materials"),h=ee("bvhData.storage.transforms"),f=L("envInfo.value.totalSumNode",e),p=L("envInfo.value.intensityNode",e),d=L("envInfo.value.sampleColor",e),g=L("envInfo.value.sampleDir",e),x=L("envInfo.value.getDirPdf",e),y=L("envInfo.value.getWeight",e),b=L("backgroundInfo.value.sampleColor",e),T=L("lightsInfo.value.countNode",e),S=B("lightsInfo.value.randomLightSample",e),C=B("lightsInfo.value.intersectLightAtIndex",e),P=B("lightsInfo.value.getLightWeight",e),F=B("lightsInfo.value.getLightsWeight",e),A=B("lightsInfo.value.selectLight",e),X=B("lightsInfo.value.isLightVisibleToCamera",e),E=m`

			fn compute(

				// indices and target
				globalId: vec3u,

				// tiles
				offset: vec2u,
				tileSize: vec2u,

				// settings
				seed: u32,
				maxBounces: u32,
				maxTransparentBounces: u32,
				maxSubsurfaceBounces: u32,
				misEnabled: u32,
				maxSamples: u32,
				filterGlossy: f32,
				clampDirect: f32,
				clampIndirect: f32,

				transmissiveBackground: u32,
				accumulateAux: u32,

			) -> void {

				// make sure we don't bleed over the edge of our tile
				if ( globalId.x >= tileSize.x || globalId.y >= tileSize.y ) {

					return;

				}

				// to screen coordinates
				let indexUV = offset + globalId.xy;
				let targetDimensions = textureDimensions( ${e.outputTarget} );
				if ( indexUV.x >= targetDimensions.x || indexUV.y >= targetDimensions.y ) {

					return;

				}

				// skip the pixel once it has hit the sample limit
				let sampleCount = textureLoad( ${e.sampleCountTarget}, indexUV ).r;
				if ( maxSamples != 0u && sampleCount >= maxSamples ) {

					return;

				}

				let uv = vec2f( indexUV ) / vec2f( targetDimensions );
				${Me}( indexUV.xy, seed, 0 );

				// scene ray
				let jitteredUv = uv + ${ne}( ${Oi} ) / vec2f( targetDimensions );
				var ray: ${R};
				if ( ! ${o}( jitteredUv, vec2f( targetDimensions ), &ray ) ) {

					// a declined pixel never takes a sample, so with a cap it counts as finished
					if ( maxSamples != 0u ) {

						textureStore( ${e.sampleCountTarget}, indexUV, vec4( maxSamples ) );

					}

					return;

				}

				ray.direction = normalize( ray.direction );

				var resultColor = vec4f( 0, 0, 0, 1 );
				var throughputColor = vec3f( 1.0 );
				var bsdfPdf = 0.0;

				// Alpha pass throughs only move where the BVH traversal starts, "rayStart" along the ray, so the
				// ray keeps the origin it scattered from, which its MIS weights are measured from
				var rayStart = 0.0;
				var traceOrigin = ray.origin;
				var isFullyTransmissive = true;
				var minPdf = 1.0;
				var transparentBounce = 0u;

				// the scattering volume the path is in. Media don't nest
				var medium: ${we};
				var subsurfaceBounces = 0u;

				// no light is sampled at a scatter event, so whatever the next segment reaches takes full weight
				var mediumScattered = false;

				// A negative value marks a sampled wavelength whose RGB reconstruction weight has not been applied yet.
				var dispersionWavelength = - mix( ${ta}.0, ${aa}.0, ${$e}( ${ji} ) );

				// one-sample NEE chooses between the analytic lights and the environment
				let envActive = ${f} > 0.0 && ${p} > 0.0;
				let lightsCount = ${T};
				var envWeight = 0.0;
				if ( envActive ) {

					envWeight = ${y}();

				}

				// added last, since a camera ray miss overwrites the pixel with the background
				var lightHits = vec3f( 0.0 );
				var cameraHitLight = false;

				// The first surface the path scatters off fills the denoiser's auxiliary images. Until one is found
				// the last mirror or transmission hit stands in, for paths that reach the environment. The albedo
				// is tinted by the throughput of the surfaces looked past to reach it
				var auxFound = false;
				var auxAlbedo = vec3f( 0.0 );
				var auxNormal = vec3f( 0.0 );

				for ( var bounce = 0u; bounce < maxBounces; bounce ++ ) {

					// Inside a medium, sample a scatter event before the next surface and only trace up to it
					var channelPdf = vec3f( 0.0 );
					var scatterDist = 0.0;
					var traceRay = ray;
					traceRay.origin = traceOrigin;
					if ( medium.inside ) {

						channelPdf = ${is}( throughputColor, medium.albedo );
						scatterDist = ${ss}( medium, channelPdf, ${ne}( ${Gi} ) );
						traceRay.maxDist = select( scatterDist, min( ray.maxDist, scatterDist ), ray.maxDist > 0.0 );

					}

					var hitResult: ${t};
					let didHit = ${a}( traceRay, &hitResult );
					let surfaceDist = select( ${Fe}, hitResult.dist, didHit );

					let segmentInMedium = medium.inside;
					if ( medium.inside ) {

						let scattered = scatterDist < surfaceDist;
						let segmentDist = select( surfaceDist, scatterDist, scattered );
						let transmittance = exp( - medium.extinction * segmentDist );
						let distancePdf = dot( channelPdf, ${ns}( medium, segmentDist, scattered ) );
						if ( distancePdf <= 0.0 ) {

							break;

						}

						if ( ! scattered ) {

							// reaching the surface, weighted by the probability of no scatter event before it
							throughputColor *= transmittance / distancePdf;

						} else {

							throughputColor *= medium.albedo * medium.extinction * transmittance / distancePdf;
							ray.origin = traceOrigin + ray.direction * scatterDist;
							traceOrigin = ray.origin;
							rayStart = 0.0;
							ray.direction = ${Yi}( ray.direction, medium.anisotropy, ${ne}( ${Qi} ) );
							ray.maxDist = 0.0;
							mediumScattered = true;
							isFullyTransmissive = false;

							// subsurface bounces are capped separately from bounces
							subsurfaceBounces ++;
							let maxThroughput = max( max( throughputColor.r, throughputColor.g ), throughputColor.b );
							if ( subsurfaceBounces >= maxSubsurfaceBounces || maxThroughput < ${ts} ) {

								break;

							}

							${zt}();
							bounce --;
							continue;

						}

					}

					// NEE's total weight at the vertex this ray left, for MIS. Camera rays have none, and
					// neither do scatter events in a medium
					let isMISWeighted = misEnabled != 0u && bounce > 0u && ! mediumScattered;
					var lightTotalWeight = 0.0;
					if ( isMISWeighted ) {

						lightTotalWeight = ${F}( ray.origin ) + envWeight;

					}

					// forward hits on area lights along the traced segment. Camera rays only see visibleToCameraRays
					// lights, at full weight
					for ( var li = 0u; li < lightsCount; li ++ ) {

						if ( bounce == 0u && ! ${X}( li ) ) {

							continue;

						}

						var lightRec: ${me};
						if ( ${C}( ray.origin, ray.direction, li, &lightRec ) && lightRec.dist > rayStart && lightRec.dist < rayStart + surfaceDist ) {

							var misWeight = 1.0;
							if ( isMISWeighted ) {

								let selectionPdf = ${P}( li, ray.origin ) / lightTotalWeight;
								misWeight = ${ye}( bsdfPdf, lightRec.pdf * selectionPdf );

							}

							lightHits += ${z}( lightRec.emission * throughputColor * misWeight, bounce, clampDirect, clampIndirect );
							cameraHitLight = cameraHitLight || bounce == 0u;

						}

					}

					if ( didHit ) {

						// whole structs are read from the buffer, not a pointer alias, which Safari fails to compile
						let objectInfo = ${h}[ hitResult.objectIndex ];
						var materialInfo = ${n}[ objectInfo.materialIndex ];

						// a matte surface hit by the camera ray renders as a fully transparent
						if ( materialInfo.matte != 0 && bounce == 0u ) {

							resultColor = vec4f( 0.0 );
							break;

						}

						// apply per-object colors
						materialInfo.color *= objectInfo.color.rgb;
						materialInfo.opacity *= objectInfo.color.a;

						let view = - ray.direction;
						var vertexData = ${s}( hitResult.barycoord, hitResult.indices.xyz );
						vertexData.normal = normalize( transpose( objectInfo.inverseMatrixWorld ) * vertexData.normal );
						vertexData.tangent = vec4f( ( objectInfo.matrixWorld * vec4f( vertexData.tangent.xyz, 0.0 ) ).xyz, vertexData.tangent.w );
						vertexData.position = objectInfo.matrixWorld * vertexData.position;

						// blur glossy surfaces after low-probability bounces to suppress fireflies,
						// from the Cycles "filter glossy" approach in integrator/surface_shader.h
						// The smallest pdf seen along the path for the glossy filter is tracked below
						let blurRoughness = sqrt( clamp( 1.0 - filterGlossy * minPdf, 0.0, 1.0 ) ) * 0.5;

						var surface = ${i}( materialInfo, vertexData, hitResult.side, hitResult.normal, view, blurRoughness );

						// Stochastically pass through partially transparent surfaces by restarting
						// the traversal at the hit point, advancing the rng but not the bounce count.
						if ( ${$e}( ${Ki} ) > surface.opacity ) {

							// stop once the transparent bounces run out
							if ( transparentBounce >= maxTransparentBounces ) {

								break;

							}

							traceOrigin = ${Ce}( vertexData.position.xyz, ray.direction, hitResult.normal );
							rayStart += hitResult.dist;
							${zt}();
							transparentBounce ++;
							bounce --;
							continue;

						}

						let isDispersive = materialInfo.dispersion > 0.0 && surface.ior > 1.0 && surface.transmission > 0.0 && ! surface.thinWall;
						if ( isDispersive ) {

							let wavelength = abs( dispersionWavelength );
							${hs}( &surface, materialInfo.dispersion, wavelength );
							if ( dispersionWavelength < 0.0 ) {

								dispersionWavelength = wavelength;
								throughputColor *= ${fs}( wavelength );

							}

						}

						// attenuate the light transmitted through the volume when exiting a backface. A scattering
						// medium has already applied its transmittance above
						if ( hitResult.side < 0.0 && materialInfo.transmission > 0.0 && ! segmentInMedium ) {

							throughputColor *= ${ds}( hitResult.dist, materialInfo.attenuationColor, materialInfo.attenuationDistance );

						}

						// emission, clamped at the depth of the segment that found it, as in Cycles
						let emission = ${z}( throughputColor * surface.emission, bounce, clampDirect, clampIndirect );
						resultColor += vec4f( emission, 0.0 );

						// next event estimation: choose one light or the environment by its estimated
						// contribution
						if ( misEnabled != 0u ) {

							let ruv = ${Ua}( ${Ui} );
							var selectionPdf = 0.0;
							let lightIndex = ${A}( vertexData.position.xyz, envWeight, ruv.x, &selectionPdf );
							if ( selectionPdf > 0.0 ) {

								var lightRec: ${me};
								if ( envActive && lightIndex == lightsCount ) {

									// the environment, sampled from its CDF, as a light of kind ENVIRONMENT
									let envSample = ${g}( ruv.yz );
									lightRec.direction = envSample.direction;
									lightRec.emission = envSample.color;
									lightRec.pdf = envSample.pdf;
									lightRec.dist = ${Fe};
									lightRec.lightType = ${Ka};

								} else {

									lightRec = ${S}( lightIndex, vertexData.position.xyz, ruv.yz );

								}

								if ( lightRec.pdf > 0.0 ) {

									let evalRec = ${u}( view, lightRec.direction, surface );
									if ( evalRec.pdf > 0.0 ) {

										var shadowRay: ${R};
										shadowRay.origin = ${Ce}( vertexData.position.xyz, lightRec.direction, hitResult.normal );
										shadowRay.direction = lightRec.direction;
										shadowRay.maxDist = lightRec.dist * ( 1.0 - ${Ji} );

										// opaque occlusion up to the light distance, attenuated by the partially
										// transparent surfaces passed
										var shadowHit: ${t};
										let occluded = ${r}( shadowRay, &shadowHit );
										if ( ! occluded ) {

											let lightPdf = lightRec.pdf * selectionPdf;

											// env + area lights are also found by bsdf rays, so MIS-weight them. Punctual lights, and lights
											// past the bounce limit, take full weight. Bsdf rays stopped by faces the shadow ray skipped can't
											// find the light, so their share of the weight moves to the light sample
											let isMISWeighted = ${es}( lightRec.lightType ) && bounce + 1u < maxBounces;
											let misWeight = select( 1.0, mix( ${ye}( lightPdf, evalRec.pdf ), 1.0, shadowHit.skippedOcclusion ), isMISWeighted );
											let directLight = throughputColor * lightRec.emission * evalRec.color * misWeight * ( 1.0 - shadowHit.occlusion ) / lightPdf;
											let contribution = ${z}( directLight, bounce + 1u, clampDirect, clampIndirect );
											resultColor += vec4f( contribution, 0.0 );

										}

									}

								}

							}

						}

						let scatterRec = ${l}( view, surface );

						if ( ! auxFound ) {

							auxFound = ${Bi}( surface, scatterRec );
							auxAlbedo = saturate( throughputColor * surface.color );
							auxNormal = surface.normal;

						}

						if ( ${ja}( scatterRec ) ) {

							break;

						}

						isFullyTransmissive = isFullyTransmissive && scatterRec.isTransmissive;

						// track the smallest pdf seen along the path for the glossy filter
						minPdf = min( minPdf, scatterRec.pdf );

						// russian roulette early out:
						// Matches Cycles path_state_continuation_probability in integrator/path_state.h
						if ( bounce >= 3u ) {

							let rrThroughput = throughputColor * scatterRec.color / scatterRec.pdf;
							let rrProb = saturate( sqrt( max( max( rrThroughput.r, rrThroughput.g ), rrThroughput.b ) ) );
							if ( rrProb <= 0.0 || ${$e}( ${qi} ) > rrProb ) {

								break;

							}

							throughputColor /= rrProb;

						}

						throughputColor *= scatterRec.color;
						throughputColor /= scatterRec.pdf;
						bsdfPdf = scatterRec.pdf;
						mediumScattered = false;

						// As in "KHR_materials_scatter", the medium's surface bsdf is its boundary: the walk ends when
						// light refracts out through it, and continues inside when it reflects back
						if ( segmentInMedium && hitResult.objectIndex == medium.object && hitResult.side < 0.0 && scatterRec.isTransmissive ) {

							medium.inside = false;

						}

						// refracting into a front face of a scattering material starts a random walk inside it
						if ( scatterRec.isTransmissive && ! surface.thinWall && hitResult.side > 0.0 ) {

							let entered = ${rs}( materialInfo, hitResult.objectIndex );

							if ( entered.inside ) {

								medium = entered;

							}

						}

						// exit if our throughput is 0.0
						if ( all( throughputColor == vec3f( 0.0 ) ) ) {

							break;

						}

						ray.origin = ${Ce}( vertexData.position.xyz, scatterRec.direction, hitResult.normal );
						ray.direction = scatterRec.direction;
						ray.maxDist = 0.0;
						traceOrigin = ray.origin;
						rayStart = 0.0;

					} else {

						if ( bounce > 0u && ! isFullyTransmissive ) {

							var misWeight = 1.0;
							if ( isMISWeighted && envActive ) {

								// match the env pdf scaling used by the NEE selection so the two estimators balance
								let envPdf = ${x}( ray.direction ) * envWeight / lightTotalWeight;
								misWeight = ${ye}( bsdfPdf, envPdf );

							}

							let environment = ${d}( ray.direction ).rgb * throughputColor * misWeight;
							let contribution = ${z}( environment, bounce, clampDirect, clampIndirect );
							resultColor += vec4f( contribution, 0.0 );

						} else {

							// hit the background
							// support multiple transparent background blending techniques
							let rng = ${ne}( ${Vi} );
							let bg = ${b}( ray.direction, rng );
							if ( bounce == 0u ) {

								// sample the background directly if this is the primary ray
								let background = ${z}( bg.a * bg.rgb, bounce, clampDirect, clampIndirect );
								resultColor = vec4f( background, bg.a );

							} else {

								// transmissive ray handling
								let env = ${d}( ray.direction );
								let avg = saturate( dot( throughputColor, vec3f( 1.0 / 3.0 ) ) );
								let transparency = ( 1.0 - bg.a ) * avg;
								var envMisWeight = 1.0;
								if ( misEnabled != 0u && ${f} > 0.0 ) {

									let envPdf = ${x}( ray.direction );
									envMisWeight = ${ye}( bsdfPdf, envPdf );

								}

								if ( transmissiveBackground == ${xs}u ) {

									// display the env map through transmissive surfaces
									let background = ${z}( env.rgb * throughputColor * envMisWeight, bounce, clampDirect, clampIndirect );
									resultColor = vec4f(
										resultColor.rgb + background,
										1.0,
									);

								} else if ( transmissiveBackground == ${vs}u ) {

									// fade the background by the throughput color average
									let background = ${z}( bg.a * bg.rgb * throughputColor * envMisWeight, bounce, clampDirect, clampIndirect );
									resultColor = vec4f(
										resultColor.rgb + background,
										1.0 - transparency,
									);

								} else {

									// fade the background by the throughput color average, mixing in env lighting
									var light = mix( env.rgb, bg.rgb, bg.a ) * envMisWeight;
									let background = ${z}( light * throughputColor, bounce, clampDirect, clampIndirect );
									resultColor = vec4f(
										resultColor.rgb + background,
										1.0 - transparency,
									);

								}

							}

						}

						break;

					}

					${zt}();

				}

				// visible lights are opaque against a transparent background
				resultColor += vec4f( lightHits, 0.0 );
				if ( cameraHitLight ) {

					resultColor.a = 1.0;

				}

				let nextSampleCount = sampleCount + 1;
				// store the color rows top down to match a rasterized render target
				let colorIndex = vec2u( indexUV.x, targetDimensions.y - 1u - indexUV.y );

				let prevColor = textureLoad( ${e.prevOutputTarget}, colorIndex );
				let blendedColor = ${Zi}( prevColor, resultColor, 1.0 / f32( nextSampleCount ) );
				textureStore( ${e.sampleCountTarget}, indexUV, vec4( nextSampleCount ) );
				textureStore( ${e.outputTarget}, colorIndex, blendedColor );

				// the auxiliary images are blended the same way, in the same row order
				if ( accumulateAux != 0u ) {

					var auxPacked: vec3u;
					for ( var layer = 0u; layer < ${oe}u; layer ++ ) {

						auxPacked[ layer ] = textureLoad( ${e.auxTarget}, colorIndex, layer ).r;

					}

					auxPacked = ${Ni}( auxPacked, auxAlbedo, auxNormal, 1.0 / f32( nextSampleCount ) );
					for ( var layer = 0u; layer < ${oe}u; layer ++ ) {

						textureStore( ${e.auxTarget}, colorIndex, layer, vec4u( auxPacked[ layer ] ) );

					}

				}

			}`;super(E(e)),this.defineUniformAccessors(e)}}function ma(c){const e=new Uint16Array(c.length);for(let t=0,a=c.length;t<a;++t)e[t]=se.toHalfFloat(c[t]);return e}function kr(c,e,t=0,a=c.length){let r=t,s=t+a-1;for(;r<s;){const i=r+s>>1;c[i]<e?r=i+1:s=i}return r-t}function hl(c,e,t){return .2126*c+.7152*e+.0722*t}function fl(c,e=G){const t=c.clone();t.source=new on({...t.image});const{width:a,height:r,data:s}=t.image;let i=s;if(t.type!==e){e===G?i=new Uint16Array(s.length):i=new Float32Array(s.length);let o;s instanceof Int8Array||s instanceof Int16Array||s instanceof Int32Array?o=2**(8*s.BYTES_PER_ELEMENT-1)-1:o=2**(8*s.BYTES_PER_ELEMENT)-1;for(let l=0,u=s.length;l<u;l++){let n=s[l];t.type===G&&(n=se.fromHalfFloat(s[l])),t.type!==Be&&t.type!==G&&(n/=o),e===G&&(i[l]=se.toHalfFloat(n))}t.image.data=i,t.type=e}if(t.flipY){const o=i;i=i.slice();for(let l=0;l<r;l++)for(let u=0;u<a;u++){const n=r-l-1,h=4*(l*a+u),f=4*(n*a+u);i[f+0]=o[h+0],i[f+1]=o[h+1],i[f+2]=o[h+2],i[f+3]=o[h+3]}t.flipY=!1,t.image.data=i}return t}class ml{constructor(){const e=new K(ma(new Float32Array([0,0,0,0])),1,1);e.type=G,e.format=ae,e.minFilter=O,e.magFilter=O,e.wrapS=be,e.wrapT=be,e.generateMipmaps=!1,e.needsUpdate=!0;const t=new K(ma(new Float32Array([0,1])),1,2);t.type=G,t.format=Ia,t.minFilter=O,t.magFilter=O,t.generateMipmaps=!1,t.needsUpdate=!0;const a=new K(ma(new Float32Array([0,0,1,1])),2,2);a.type=G,a.format=Ia,a.minFilter=O,a.magFilter=O,a.generateMipmaps=!1,a.needsUpdate=!0,this.map=e,this.marginalWeights=t,this.conditionalWeights=a,this.totalSum=0}getPixelWeight(e,t,a){return hl(e,t,a)}dispose(){this.marginalWeights.dispose(),this.conditionalWeights.dispose(),this.map.dispose()}updateFrom(e){const t=fl(e);t.wrapS=be,t.wrapT=Vt;const{width:a,height:r,data:s}=t.image,i=new Float32Array(a*r),o=new Float32Array(a*r),l=new Float32Array(r),u=new Float32Array(r);let n=0,h=0;for(let x=0;x<r;x++){let y=0;for(let b=0;b<a;b++){const T=x*a+b,S=se.fromHalfFloat(s[4*T+0]),C=se.fromHalfFloat(s[4*T+1]),P=se.fromHalfFloat(s[4*T+2]),F=this.getPixelWeight(S,C,P,x,r);y+=F,n+=F,i[T]=F,o[T]=y}if(y!==0)for(let b=x*a,T=x*a+a;b<T;b++)i[b]/=y,o[b]/=y;h+=y,l[x]=y,u[x]=h}if(h!==0)for(let x=0,y=l.length;x<y;x++)l[x]/=h,u[x]/=h;const f=new Uint16Array(r),p=new Uint16Array(a*r);for(let x=0;x<r;x++){const y=(x+1)/r,b=kr(u,y);f[x]=se.toHalfFloat((b+.5)/r)}for(let x=0;x<r;x++)for(let y=0;y<a;y++){const b=x*a+y,T=(y+1)/a,S=kr(o,T,x*a,a);p[b]=se.toHalfFloat((S+.5)/a)}this.dispose();const{marginalWeights:d,conditionalWeights:g}=this;d.image={width:r,height:1,data:f},d.needsUpdate=!0,g.image={width:a,height:r,data:p},g.needsUpdate=!0,this.totalSum=n,this.map=t,this.cdfMarginal=u,this.cdfConditional=o}}class ys extends ml{constructor(){super(),this.mapNode=te(this.map),this.mapSampler=Gt(this.mapNode),this.cdfNode=_(new I(new Float32Array([0,1,0,1]),1),"float").toReadOnly(),this.rotationNode=w(new mi),this.intensityNode=w(1),this.totalSumNode=w(this.totalSum),this._initFns()}getPixelWeight(e,t,a,r,s){const i=Math.PI*(r+.5)/s;return super.getPixelWeight(e,t,a)*Math.sin(i)}updateFrom(e){super.updateFrom(e);const{mapNode:t,cdfNode:a,totalSumNode:r}=this;t.value=this.map,r.value=this.totalSum;const{width:s,height:i}=this.map.image,{cdfMarginal:o,cdfConditional:l}=this,u=new Float32Array(i+1+i*(s+1));u.set(o,1);for(let n=0;n<i;n++)u.set(l.subarray(n*s,n*s+s),i+1+n*(s+1)+1);a.value=new I(u,1)}dispose(){super.dispose(),this.cdfNode.value.dispose()}_initFns(){const{mapNode:e,mapSampler:t,cdfNode:a,totalSumNode:r,rotationNode:s,intensityNode:i}=this,o=m`
			fn searchEnvCdf( r: f32, offset: u32, count: u32, fraction: ptr<function, f32> ) -> u32 {

				var lower = 0u;
				var upper = count - 1u;
				while ( lower < upper ) {

					let mid = ( lower + upper ) >> 1u;
					if ( ${a}[ offset + mid + 1u ] <= r ) {

						lower = mid + 1u;

					} else {

						upper = mid;

					}

				}

				let start = ${a}[ offset + lower ];
				let end = ${a}[ offset + lower + 1u ];
				*fraction = select( 0.5, saturate( ( r - start ) / ( end - start ) ), end > start );
				return lower;

			}
		`,l=m`
			fn getEnvTexelPdf( texel: vec2u, v: f32 ) -> f32 {

				let resolution = textureDimensions( ${e} );
				let rowOffset = resolution.y + 1u + texel.y * ( resolution.x + 1u );
				let rowPdf = ${a}[ texel.y + 1u ] - ${a}[ texel.y ];
				let pixelPdf = ${a}[ rowOffset + texel.x + 1u ] - ${a}[ rowOffset + texel.x ];

				// the equirect projection stretches each pixel by 1 / sin( theta ) over the sphere
				let sinTheta = sin( ${fe} * v );
				return select( 0.0, rowPdf * pixelPdf * f32( resolution.x * resolution.y ) / ( 2.0 * ${fe} * ${fe} * sinTheta ), sinTheta > 0.0 );

			}
		`;this.sampleColor=m`
			fn sampleEnv( direction: vec3f ) -> vec4f {

				let sampleDir = ${s} * direction;
				let mapUv = ${Ut}( sampleDir );
				let col = textureSampleLevel( ${e}, ${t}, mapUv, 0 );

				return vec4f( ${i} * col.rgb, col.a );

			}
		`,this.sampleDir=m`
			fn sampleEnvDir( r: vec2f ) -> ${_r} {

				var result: ${_r};

				// search the CDFs: marginal picks the row (v), conditional picks the column (u), and the
				// fractions place the sample within the pixel
				let resolution = textureDimensions( ${e} );
				var rowFraction = 0.0;
				var columnFraction = 0.0;
				let row = ${o}( r.x, 0u, resolution.y, &rowFraction );
				let column = ${o}( r.y, resolution.y + 1u + row * ( resolution.x + 1u ), resolution.x, &columnFraction );
				let texel = vec2u( column, row );
				let uv = ( vec2f( texel ) + vec2f( columnFraction, rowFraction ) ) / vec2f( resolution );

				let direction = ${bo}( uv );
				let color = textureSampleLevel( ${e}, ${t}, uv, 0 ).rgb;

				result.direction = transpose( ${s} ) * direction;
				result.color = color * ${i};
				result.pdf = ${l}( texel, uv.y );

				return result;

			}
		`,this.getWeight=m`
			fn getEnvWeight() -> f32 {

				let resolution = textureDimensions( ${e} );
				return ${i} * ${fe} * ${fe} * ${r} / ( 2.0 * f32( resolution.x * resolution.y ) );

			}
		`,this.getDirPdf=m`
			fn getEnvDirPdf( direction: vec3f ) -> f32 {

				if ( ${r} == 0.0 ) {

					return 0.0;

				}

				let rotatedDir = ${s} * direction;
				let mapUv = ${Ut}( rotatedDir );
				let resolution = textureDimensions( ${e} );
				let texel = min( vec2u( mapUv * vec2f( resolution ) ), resolution - 1u );

				return ${l}( texel, mapUv.y );

			}
		`}}class bs{get map(){return this.mapNode.value}set map(e){this.mapNode.value=e}get blur(){return this.blurNode.value}set blur(e){this.blurNode.value=e}get rotation(){return this.rotationNode.value}get intensity(){return this.intensityNode.value}set intensity(e){this.intensityNode.value=e}constructor(){const e=new K(new Uint8Array([0,0,0,255]),1,1,ae);e.minFilter=O,e.magFilter=O,e.wrapS=be,e.wrapT=be,e.generateMipmaps=!1,e.needsUpdate=!0,this.mapNode=te(e),this.mapSampler=Gt(this.mapNode),this.blurNode=w(0),this.rotationNode=w(new N),this.intensityNode=w(1),this._initFns()}dispose(){this.map.dispose()}_initFns(){const{mapNode:e,mapSampler:t,blurNode:a,rotationNode:r,intensityNode:s}=this;this.sampleColor=m`
			fn sampleBackground( direction: vec3f, uv: vec2f ) -> vec4f {

				let rotatedDir = ( ${r} * vec4f( direction, 0.0 ) ).xyz;
				let offsetDir = ${xo}( rotatedDir, uv ) * 0.5 * ${a};
				let sampleDir = normalize( rotatedDir + offsetDir );

				let mapUv = ${Ut}( sampleDir );
				let col = textureSampleLevel( ${e}, ${t}, mapUv, 0 );

				return vec4f( ${s} * col.rgb, col.a );

			}
		`}}const Er=new gi,zr=new mi;function Hr(c){return`${c.source.uuid}:${c.source.version}`}function pl(c,e,t,a){if(c[e].x+t>a)return-1;let s=t,i=0,o=e;for(;s>0;){if(o>=c.length)return-1;i=Math.max(i,c[o].y),s-=c[o].width,o++}return i}function gl(c,e,t,a){const r=e+a,s=[];let i=!1;for(let o=0;o<c.length;o++){const l=c[o],u=l.x+l.width;u<=e?s.push(l):l.x>=r?(i||(s.push({x:e,y:t,width:a}),i=!0),s.push(l)):(i||(s.push({x:e,y:t,width:a}),i=!0),u>r&&s.push({x:r,y:l.y,width:u-r}))}i||s.push({x:e,y:t,width:a}),c.length=0;for(let o=0;o<s.length;o++){const l=s[o],u=c[c.length-1];u&&u.y===l.y&&u.x+u.width===l.x?u.width+=l.width:c.push(l)}}function Or(c,e,t,a,r){let s=1/0,i=0,o=-1;for(let l=0;l<c.length;l++){const u=pl(c,l,e,a);u>=0&&u+t<=r&&u<s&&(s=u,i=c[l].x,o=l)}return o===-1?null:(gl(c,i,s+t,e),{x:i,y:s})}class ws{get width(){return this.renderTarget.width}get height(){return this.renderTarget.height}get pageCount(){return this.renderTarget.depth}get texture(){return this.renderTarget.texture}constructor(e={}){this.renderTarget=new pi(1,1,{depthBuffer:!1,depth:1,...e}),this.texture.isArrayTexture=!0,this.textureInfo=[new De],this.hashes=[],this.placements=[],this.quadMesh=new ii(new ln),this.quadMesh.material.blending=Kt}setTextures(e,t){const a=t.map((h,f)=>f);if(a.sort((h,f)=>t[h].source.uuid<t[f].source.uuid?-1:1),t=a.map(h=>t[h]),this._hashesMatch(t)){this._buildCallerTextureInfo(a);return}let r=t.reduce((h,f)=>Math.max(h,f.width,f.height),1);r=Math.min(e.backend.device.limits.maxTextureDimension2D,r);const s=r,i=r,{renderTarget:o}=this,{placements:l,pageCount:u}=this._packTextures(t,s,i);o.setSize(s,i,u),this.texture.isArrayTexture=!0,this._renderTextures(e,t,l),this.placements=l;const n=new Array(t.length);for(let h=0,f=t.length;h<f;h++){const p=Hr(t[h]);n[h]=p}this.hashes=n,this._buildCallerTextureInfo(a)}_buildCallerTextureInfo(e){const t=new Array(e.length);for(let a=0,r=e.length;a<r;a++)t[e[a]]=this.placements[a];this._buildTextureInfo(t)}dispose(){this.renderTarget.dispose(),this.quadMesh.material.dispose()}_hashesMatch(e){const t=this.hashes;if(t.length!==e.length)return!1;for(let a=0,r=e.length;a<r;a++)if(t[a]!==Hr(e[a]))return!1;return!0}_packTextures(e,t,a){const r=[];for(let l=0,u=e.length;l<u;l++){const n=e[l];r.push({index:l,w:Math.min(n.width,t),h:Math.min(n.height,a)})}const s=r.sort((l,u)=>u.h-l.h),i=new Array(e.length),o=[];for(let l=0,u=s.length;l<u;l++){const n=s[l];let h=null,f=-1;for(let p=0;p<o.length;p++)if(h=Or(o[p],n.w,n.h,t,a),h){f=p;break}if(!h){const p=[{x:0,y:0,width:t}];h=Or(p,n.w,n.h,t,a),o.push(p),f=o.length-1}i[n.index]={x:h.x,y:h.y,w:n.w,h:n.h,page:f}}return{placements:i,pageCount:Math.max(o.length,1)}}_buildTextureInfo(e){const t=this.textureInfo;t.length=0;for(let a=0,r=e.length;a<r;a++){const{x:s,y:i,w:o,h:l,page:u}=e[a],n=new De;n.x=s&65535|(i&65535)<<16,n.y=o&65535|(l&65535)<<16,n.z=u&65535,n.w=0,t.push(n)}t.length===0&&t.push(new De(0,0,0,0))}_renderTextures(e,t,a){const{quadMesh:r,renderTarget:s,width:i,height:o}=this,l=e.getRenderTarget(),u=e.toneMapping,n=e.autoClear,h=e.getScissorTest(),f=e.getClearAlpha();e.getClearColor(Er),e.toneMapping=ot,e.autoClear=!1,e.setScissorTest(!0),e.setClearColor(0,0);for(let p=0,d=s.depth;p<d;p++)s.viewport.set(0,0,i,o),s.scissor.set(0,0,i,o),e.setRenderTarget(s,p),e.clear();for(let p=0,d=t.length;p<d;p++){const{x:g,y:x,w:y,h:b,page:T}=a[p],S=t[p];if(s.viewport.set(g,x,y,b),s.scissor.set(g,x,y,b),e.setRenderTarget(s,T),S.isRenderTargetTexture){const C=S.matrixAutoUpdate;zr.copy(S.matrix),S.matrix.identity(),S.matrixAutoUpdate=!1,r.material.map=S,r.render(e),S.matrixAutoUpdate=C,S.matrix.copy(zr)}else{const C=S.clone();C.matrixAutoUpdate=!1,C.matrix.identity(),r.material.map=C,r.render(e),C.dispose()}}s.viewport.set(0,0,i,o),s.scissor.set(0,0,i,o),r.material.map=null,e.setClearColor(Er,f),e.setScissorTest(h),e.autoClear=n,e.setRenderTarget(l),e.toneMapping=u}}function xl(c){let e=0;if(c.byteLength!==0){const t=new Uint8Array(c);for(let a=0;a<c.byteLength;a++){const r=t[a];e=(e<<5)-e+r,e|=0}}return e}const pa=6,vl=11,yl=0,bl=1,wl=2,Sl=3,Tl=4,Z=new H,U=new H,Vr=new N,ze=new cn,Wr=new H,ie=new H,Il=new H(0,1,0);class _l{constructor(){const e=new K(new Float32Array(4),1,1);e.format=ae,e.type=Be,e.wrapS=Vt,e.wrapT=Vt,e.generateMipmaps=!1,e.minFilter=ht,e.magFilter=ht,this.tex=e,this.count=0}updateFrom(e,t=[]){const a=this.tex,r=Math.max(e.length*pa,1),s=Math.ceil(Math.sqrt(r));a.image.width!==s&&(a.dispose(),a.image.data=new Float32Array(s*s*4),a.image.width=s,a.image.height=s);const i=a.image.data;for(let l=0,u=e.length;l<u;l++){const n=e[l],h=l*pa*4;let f=0;for(let d=0;d<pa*4;d++)i[h+d]=0;n.getWorldPosition(U),i[h+f++]=U.x,i[h+f++]=U.y,i[h+f++]=U.z;let p=yl;if(n.isRectAreaLight&&n.isCircular?p=bl:n.isSpotLight?p=wl:n.isDirectionalLight||n.isSunLight?p=Sl:n.isPointLight&&(p=Tl),i[h+f++]=p,i[h+f++]=n.color.r,i[h+f++]=n.color.g,i[h+f++]=n.color.b,i[h+f++]=n.intensity,n.getWorldQuaternion(ze),n.isRectAreaLight)Z.set(n.width,0,0).applyQuaternion(ze),i[h+f++]=Z.x,i[h+f++]=Z.y,i[h+f++]=Z.z,f++,U.set(0,n.height,0).applyQuaternion(ze),i[h+f++]=U.x,i[h+f++]=U.y,i[h+f++]=U.z,i[h+f++]=Z.cross(U).length()*(n.isCircular?Math.PI/4:1);else if(n.isSpotLight){const d=n.radius||0;Wr.setFromMatrixPosition(n.matrixWorld),ie.setFromMatrixPosition(n.target.matrixWorld),Vr.lookAt(Wr,ie,Il),ze.setFromRotationMatrix(Vr),Z.set(1,0,0).applyQuaternion(ze),i[h+f++]=Z.x,i[h+f++]=Z.y,i[h+f++]=Z.z,f++,U.set(0,1,0).applyQuaternion(ze),i[h+f++]=U.x,i[h+f++]=U.y,i[h+f++]=U.z,i[h+f++]=Math.PI*d*d,i[h+f++]=d,i[h+f++]=n.decay,i[h+f++]=n.distance,i[h+f++]=Math.cos(n.angle),i[h+f++]=Math.cos(n.angle*(1-n.penumbra)),i[h+f++]=n.iesMap?t.indexOf(n.iesMap):-1}else if(n.isPointLight){const d=Z.setFromMatrixPosition(n.matrixWorld);i[h+f++]=d.x,i[h+f++]=d.y,i[h+f++]=d.z,f++,f+=4,f+=1,i[h+f++]=n.decay,i[h+f++]=n.distance}else if(n.isDirectionalLight){const d=Z.setFromMatrixPosition(n.matrixWorld),g=U.setFromMatrixPosition(n.target.matrixWorld);ie.subVectors(d,g).normalize(),i[h+f++]=ie.x,i[h+f++]=ie.y,i[h+f++]=ie.z}else n.isSunLight&&(ie.setFromMatrixPosition(n.matrixWorld).normalize(),i[h+f++]=ie.x,i[h+f++]=ie.y,i[h+f++]=ie.z);i[h+vl]=n.visibleToCameraRays?1:0}this.count=e.length;const o=xl(i.buffer);return this.hash!==o?(this.hash=o,a.needsUpdate=!0,!0):!1}}class Ss extends _l{constructor(){super(),this.countNode=w(this.count,"uint"),this.buffer=new I(new Float32Array(2*Re.getLength()),Re.getLength()),this.bufferNode=_(this.buffer,Re).toReadOnly().setName("lights"),this.iesAtlas=new ws({type:G}),this.iesProfilesNode=te(this.iesAtlas.texture),this.iesInfoNode=Ht(this.iesAtlas.textureInfo,"uvec4").setName("iesInfo"),this._initFns()}updateFrom(e,t){const a=Array.from(new Set(t.map(n=>n.iesMap).filter(n=>n))),r=super.updateFrom(t,a);this.iesAtlas.setTextures(e,a),this.iesProfilesNode.value=this.iesAtlas.texture;const s=Re.getLength(),i=this.count,o=Math.max(i,2);this.buffer.array.length!==o*s&&(this.buffer.dispose(),this.buffer=new I(new Float32Array(o*s),s),this.bufferNode.value=this.buffer);const l=this.tex.image.data;this.buffer.array.set(l.subarray(0,i*s));const u=new Int32Array(this.buffer.array.buffer);for(let n=0;n<i;n++){const h=n*s;u[h+3]=Math.round(l[h+3]),u[h+11]=Math.round(l[h+11]),u[h+21]=Math.round(l[h+21])}return this.buffer.needsUpdate=!0,this.countNode.value=this.count,r}_initFns(){const{bufferNode:e,countNode:t,iesProfilesNode:a,iesInfoNode:r}=this,s=Xi(r,a,"sampleIesTexel");this.isLightVisibleToCamera=m`
			fn isLightVisibleToCamera( index: u32 ) -> bool {

				return ${e}[ index ].visibleToCameraRays != 0;

			}
		`,this.getLightWeight=m`
			fn getLightWeight( index: u32, position: vec3f ) -> f32 {

				let light = ${e}[ index ];
				let power = ${yo}( light.color * light.intensity );
				if ( light.lightType == ${Fr} ) {

					// the most any point on the spot's disc lights the position. Ies profiles are not
					// evaluated here
					let nearest = ${_o}( light, position );
					var attenuation = 1.0;
					if ( light.iesProfile < 0 ) {

						attenuation = ${Nr}( light.coneCos, light.penumbraCos, nearest.x );

					}

					return power * attenuation * ${Ma}( nearest.y, light.distance, light.decay );

				} else if ( light.lightType == ${Br} ) {

					// the point light's world position is packed into the u slot
					let dist = length( light.u - position );
					return power * ${Ma}( dist, light.distance, light.decay );

				} else if ( light.lightType == ${Pr} ) {

					return power;

				} else {

					let toLight = light.position - position;
					let distSq = dot( toLight, toLight );
					if ( distSq == 0.0 ) {

						return 0.0;

					}

					// area lights only emit from their front face, and the distance is held above the size
					// of the light so positions on or near it do not dominate
					let normal = normalize( cross( light.u, light.v ) );
					let cosTheta = dot( toLight, normal ) * inverseSqrt( distSq );
					return power * light.area * max( cosTheta, 0.0 ) / max( distSq, light.area );

				}

			}
		`,this.getLightsWeight=m`
			fn getLightsWeight( position: vec3f ) -> f32 {

				var total = 0.0;
				for ( var i = 0u; i < ${t}; i ++ ) {

					total += ${this.getLightWeight}( i, position );

				}

				return total;

			}
		`,this.selectLight=m`
			fn selectLight( position: vec3f, envWeight: f32, r: f32, selectionPdf: ptr<function, f32> ) -> u32 {

				let count = ${t};
				let totalWeight = ${this.getLightsWeight}( position ) + envWeight;
				if ( totalWeight <= 0.0 ) {

					*selectionPdf = 0.0;
					return 0u;

				}

				let targetWeight = r * totalWeight;
				var accumulated = 0.0;
				var lastWeighted = 0u;
				var index = count;
				for ( var i = 0u; i < count; i ++ ) {

					let lightWeight = ${this.getLightWeight}( i, position );
					accumulated += lightWeight;
					if ( lightWeight > 0.0 ) {

						lastWeighted = i;

					}

					if ( targetWeight < accumulated ) {

						index = i;
						break;

					}

				}

				// rounding can carry the target past the last light when there is no environment
				if ( index == count && envWeight <= 0.0 ) {

					index = lastWeighted;

				}

				var weight = envWeight;
				if ( index < count ) {

					weight = ${this.getLightWeight}( index, position );

				}

				*selectionPdf = weight / totalWeight;
				return index;

			}
		`,this.randomLightSample=m`
			fn randomLightSample( lightIndex: u32, rayOrigin: vec3f, ruv: vec2f ) -> ${me} {

				let light = ${e}[ lightIndex ];

				var result: ${me};
				if ( light.lightType == ${Fr} ) {

					result = ${Io}( light, rayOrigin, ruv );

					let spotNormal = normalize( cross( light.u, light.v ) );
					let cosTheta = dot( result.direction, spotNormal );
					var spotAttenuation: f32;
					if ( light.iesProfile >= 0 ) {

						// half a texel of the profile's tile in the atlas
						let profileInfo = ${r}[ u32( light.iesProfile ) ];
						let texelInset = 0.5 / vec2f( vec2u( profileInfo.y & 0xFFFFu, profileInfo.y >> 16u ) );

						// tilt spans [ 0, 180 ]deg inset to the texel centers, twist covers [ 0, 359 ]deg and wraps
						let tiltAngle = mix( texelInset.x, 1.0 - texelInset.x, acos( cosTheta ) / PI );
						let twistAngle = ( atan2( dot( result.direction, light.v ), dot( result.direction, light.u ) ) + PI ) / ( 2.0 * PI ) + texelInset.y;
						let packedProfile = ( 1 << 26 ) | light.iesProfile;
						spotAttenuation = ${s}( vec2f( tiltAngle, twistAngle ), packedProfile, 0.0 ).r;

					} else {

						spotAttenuation = ${Nr}( light.coneCos, light.penumbraCos, cosTheta );

					}

					result.emission *= spotAttenuation;

				} else if ( light.lightType == ${Br} ) {

					// the point light's world position is packed into the u slot
					let lightRay = light.u - rayOrigin;
					let lightDist = length( lightRay );
					let cutoffDistance = light.distance;
					var distanceFalloff = 1.0 / max( pow( lightDist, light.decay ), 0.01 );
					if ( cutoffDistance > 0.0 ) {

						let window = clamp( 1.0 - pow( lightDist / cutoffDistance, 4.0 ), 0.0, 1.0 );
						distanceFalloff *= window * window;

					}

					result.direction = normalize( lightRay );
					result.dist = lightDist;
					result.pdf = 1.0;
					result.emission = light.color * light.intensity * distanceFalloff;
					result.lightType = light.lightType;

				} else if ( light.lightType == ${Pr} ) {

					// the directional light's direction is packed into the u slot
					result.dist = ${Fe};
					result.direction = light.u;
					result.pdf = 1.0;
					result.emission = light.color * light.intensity;
					result.lightType = light.lightType;

				} else {

					result = ${To}( light, rayOrigin, ruv );

				}

				return result;

			}
		`,this.intersectLightAtIndex=m`
			fn intersectLightAtIndex( rayOrigin: vec3f, rayDirection: vec3f, index: u32, lightRec: ptr<function, ${me}> ) -> bool {

				let light = ${e}[ index ];

				var u = light.u;
				var v = light.v;
				let normal = normalize( cross( u, v ) );

				// only front-facing area lights can be hit
				if ( dot( normal, rayDirection ) > 0.0 ) {

					u *= 1.0 / dot( u, u );
					v *= 1.0 / dot( v, v );

					var dist = - 1.0;
					if ( light.lightType == ${Ga} ) {

						dist = ${wo}( light.position, normal, u, v, rayOrigin, rayDirection );

					} else if ( light.lightType == ${Qa} ) {

						dist = ${So}( light.position, normal, u, v, rayOrigin, rayDirection );

					}

					if ( dist > 0.0 ) {

						let cosTheta = dot( rayDirection, normal );
						lightRec.dist = dist;
						lightRec.pdf = ( dist * dist ) / ( light.area * cosTheta );
						lightRec.emission = light.color * light.intensity;
						lightRec.direction = rayDirection;
						lightRec.lightType = light.lightType;
						return true;

					}

				}

				return false;

			}
		`}dispose(){this.tex.dispose(),this.buffer.dispose(),this.iesAtlas.dispose()}}class ga extends k{constructor(){const e={globalId:W,outputTarget:j(new pe(1,1)).toWriteOnly()},t=()=>e.outputTarget.value.isArrayTexture?"globalId.xy, globalId.z":"globalId.xy",a=m`
			fn compute( globalId: vec3u ) -> void {

				textureStore( ${e.outputTarget}, ${t}, vec4( 0, 0, 0, 1 ) );

			}
		`;super(a(e)),this.defineUniformAccessors({target:e.outputTarget})}}const Rl=0,Ur=1;class Ts{constructor(e){this.renderer=e,this.maxBounces=15,this.frameBudget=25e4,this.maxTransparentBounces=15,this.maxSubsurfaceBounces=256,this.lowResMode=!1,this.maxSamples=0,this.asyncCompile=!1,this.compiling=!1,this.timing={count:0,frameTime:0,frameBudget:0},this._renderTask=null,this._compileState=new WeakMap,this._timestampUIDs=null,this._timingFrame=!1,this.outputTarget=We("Output #0"),this.prevOutputTarget=We("Output #1"),this.sampleCountTarget=Yt("Sample Count"),this.sampleCountClearKernel=new ga().setWorkgroupSize(8,8,1),this.outputTargetClearKernel=new ga().setWorkgroupSize(8,8,1),this.auxTargetClearKernel=new ga().setWorkgroupSize(8,8,1),this.auxTarget=null,this._auxPlaceholder=Ue()}setAccumulateAux(e){var t;if(!!this.auxTarget!==e){if((t=this.auxTarget)==null||t.dispose(),this.auxTarget=null,e){const{width:a,height:r}=this.outputTarget;this.auxTarget=Ue("Auxiliary Images"),this.auxTarget.setSize(a,r,oe)}this.reset()}}setRandom(e){}setBVHData(e){}setTextures(e){}setMaterial(e){}setFilterGlossy(e){}setClamping(e,t){}setEnvironment(e,t,a){}setLights(e){}setBackground(e,t,a,r){}*compileKernels(e){const{renderer:t,_compileState:a}=this;if(!this.asyncCompile||!t.compileComputeAsync)return;const r=e.map(i=>i.kernel),s=r.filter(i=>!a.has(i));for(s.length>0&&(this.compiling=!0,yield,s.forEach(i=>a.set(i,Rl)),t.compileComputeAsync(s).catch(()=>{}).finally(()=>{s.forEach(i=>a.set(i,Ur))}));r.some(i=>a.get(i)!==Ur);)this.compiling=!0,yield;this.compiling=!1}rebuild(){this._renderTask=null}setSize(e,t){var s;e=Math.ceil(e),t=Math.ceil(t);const{width:a,height:r}=this.outputTarget;return a===e&&r===t?!1:(this.outputTarget.dispose(),this.prevOutputTarget.dispose(),this.sampleCountTarget.dispose(),this.outputTarget=this.outputTarget.clone(),this.prevOutputTarget=this.outputTarget.clone(),this.sampleCountTarget=this.sampleCountTarget.clone(),this.outputTarget.setSize(e,t),this.prevOutputTarget.setSize(e,t),this.sampleCountTarget.setSize(e,t),(s=this.auxTarget)==null||s.setSize(e,t,oe),this.reset(),!0)}getSize(e){const{width:t,height:a}=this.outputTarget;return e.x=t,e.y=a,e}getPreviewPixelBudget(){return this.frameBudget}update(){const{renderer:e}=this;if(!e.initialized)return;this._renderTask||(this._renderTask=this.createRenderTask());const t=e.backend.trackTimestamp&&!this._timingFrame;this._timestampUIDs=t?[]:null,this._renderTask.next(),t&&this._timestampUIDs.length>0&&this._measureFrameTime(this._timestampUIDs),this._timestampUIDs=null}dispatch(e,t){var r;const{renderer:a}=this;a.compute(e.kernel,t),(r=this._timestampUIDs)==null||r.push(a.backend.getTimestampUID(e.kernel))}async _measureFrameTime(e){const{renderer:t,timing:a,frameBudget:r}=this,{backend:s}=t;this._timingFrame=!0,await t.resolveTimestampsAsync(un.COMPUTE),this._timingFrame=!1,e.every(i=>s.hasTimestampQuery(i))&&(a.frameTime=e.reduce((i,o)=>i+s.getTimestamp(o),0),a.frameBudget=r,a.count++)}*createRenderTask(){}async getSampleCountsAsync(){return{min:0,max:0,avg:0}}resetSeed(){}reset(){const{renderer:e,outputTargetClearKernel:t,sampleCountClearKernel:a,outputTarget:r,prevOutputTarget:s,sampleCountTarget:i}=this;if(!e.initialized)return;const{width:o,height:l}=r,u=t.getDispatchSize(o,l);if(t.target=r,e.compute(t.kernel,u),t.target=s,e.compute(t.kernel,u),a.target=i,e.compute(a.kernel,u),this.auxTarget){const{auxTargetClearKernel:n}=this;n.target=this.auxTarget,e.compute(n.kernel,n.getDispatchSize(o,l,oe))}this._renderTask=null}dispose(){var e;this.outputTarget.dispose(),this.prevOutputTarget.dispose(),this.sampleCountTarget.dispose(),this.sampleCountClearKernel.dispose(),this.outputTargetClearKernel.dispose(),this.auxTargetClearKernel.dispose(),(e=this.auxTarget)==null||e.dispose(),this._auxPlaceholder.dispose(),this._renderTask=null}}const xa=new V;class Cl extends Ts{constructor(e){super(e),this.envInfo=new ys,this._completedSamples=0,this._tileProgress=0,this.kernel=new dl().setWorkgroupSize(8,8,1),this.kernel.envInfo=this.envInfo,this.backgroundInfo=new bs,this.kernel.backgroundInfo=this.backgroundInfo,this.lightsInfo=new Ss,this.kernel.lightsInfo=this.lightsInfo}resetSeed(){this.kernel.seed=0}reset(){super.reset(),this._completedSamples=0,this._tileProgress=0}async getSampleCountsAsync(){if(this.lowResMode)return{min:0,max:0,avg:0};const e=this._completedSamples,t=this._tileProgress;return{min:t===1?e+1:e,max:e+1,avg:e+t}}setBVHData(e){this.kernel.context.bvhData=e,this.rebuild()}rebuild(){super.rebuild(),this.kernel.needsUpdate=!0,this.reset()}setRandom(e){this.kernel.context.random=e,this.kernel.needsUpdate=!0,this.reset()}setMaterial(e){this.kernel.material=e.getData(),this.kernel.needsUpdate=!0,this.reset()}setFilterGlossy(e){this.kernel.filterGlossy=e===0?ls:1/e,this.reset()}setClamping(e,t){this.kernel.clampDirect=e,this.kernel.clampIndirect=t,this.reset()}setEnvironment(e){this.envInfo.updateFrom(e)}setLights(e){this.lightsInfo.updateFrom(this.renderer,e),this.reset()}setMultipleImportanceSampling(e){this.kernel.misEnabled=e?1:0,this.reset()}setEnvironmentParams(e,t){const{envInfo:a}=this,r=new N().makeRotationFromEuler(t).invert();a.rotationNode.value.setFromMatrix4(r),a.intensityNode.value=e}setBackground(e){const{backgroundInfo:t}=this;t.dispose(),t.map=e}setBackgroundParams(e,t,a){const{backgroundInfo:r}=this,s=new N().makeRotationFromEuler(t).invert();r.rotationNode.value.copy(s),r.intensity=e,r.blur=a}setTransmissiveBackground(e){this.kernel.transmissiveBackground=e,this.reset()}*createRenderTask(){const{renderer:e,kernel:t,maxBounces:a,maxTransparentBounces:r,maxSubsurfaceBounces:s,outputTarget:i,sampleCountTarget:o,lowResMode:l}=this,u=new V;t.outputTarget=i,t.sampleCountTarget=o,t.maxBounces=a,t.maxTransparentBounces=r,t.maxSubsurfaceBounces=s,yield*this.compileKernels([t]);let n=0;for(;;){if(t.maxSamples=this.maxSamples,t.auxTarget=this.auxTarget??this._auxPlaceholder,t.accumulateAux=this.auxTarget?1:0,this.maxSamples!==0&&n>=this.maxSamples){yield;continue}this.getSize(xa);const h=l?1:Math.max(1,Math.ceil(xa.x*xa.y/this.frameBudget));u.x=Math.ceil(Math.sqrt(h)),u.y=Math.ceil(h/u.x);const f=this.lowResMode?1:u.x*u.y;let p=0;const d=t.tileSize;l?this.getSize(d):this.getSize(d).divide(u).ceil();const g=t.getDispatchSize(d.x,d.y);t.seed+=1,e.copyTextureToTexture(this.outputTarget,this.prevOutputTarget),[this.outputTarget,this.prevOutputTarget]=[this.prevOutputTarget,this.outputTarget],t.prevOutputTarget=this.prevOutputTarget,t.outputTarget=this.outputTarget;for(let x=0;x<u.x;x++)for(let y=0;y<u.y;y++)t.offset.set(x,y).multiply(d),this.dispatch(t,g),p=Math.min(p+1,f),this._completedSamples=n,this._tileProgress=p/f,yield;n++}}dispose(){super.dispose(),this.envInfo.dispose(),this.lightsInfo.dispose(),this.kernel.dispose()}}class Dl extends ${constructor(e,t,a=[]){super(e,t),this.dependencies=a}setup(e){for(const t of this.dependencies)t.build(e);super.setup(e)}}const Is={throughputColor:"vec3f",currentBounce:"uint",resultColor:"vec4f",emission:"vec3f",scatterPdf:"float",scatterColor:"vec3f",minPdf:"float",origin:"vec3f",isFullyTransmissive:"uint",direction:"vec3f",side:"float",normal:"vec3f",objectIndex:"int",barycoord:"vec3f",pixelIndex:"uint",indices:"vec3u",seed:"uint",lightDirection:"vec3f",lightPdf:"float",lightEmission:"vec3f",lightDist:"float",lightBsdf:"vec3f",lightBsdfPdf:"float",rayIntersectionIndex:"int",shadowRayIntersectionIndex:"int",lightType:"int",dist:"float",alphaDepth:"uint",rayStart:"float",maxDist:"float",dispersionWavelength:"float",auxAlbedo:"uint",auxNormal:"uint",subsurfaceBounces:"uint",walkPending:"uint",mediumScattered:"uint"},de=new Dl({...Is,medium:qe.name},"RayData",[qe]),$l=new $(Is).getLength();de.getLength=()=>$l+qe.getLength();const je=new $({origin:"vec3f",pixelIndex:"uint",direction:"vec3f",rngIndex:"uint",seed:"uint",maxDist:"float",_alignment0:"uint",_alignment1:"uint"},"TraceQueuedRay"),sa=new $({barycoord:"vec3f",objectIndex:"int",position:"vec3f",dist:"float",normal:"vec3f",side:"float",indices:"vec3u"},"TraceResult"),Ja=new $({objectIndex:"int",skippedOcclusion:"float",occlusion:"float"},"ShadowTraceResult"),Ve=0,er=1,va=2,tr=0,qt=1,_s=0,jt=1,mt=2;class Ml extends k{constructor(){const e={rayDataStorage:_(new I(1,1),de),pixelQueue:_(new I(1,1),"uint"),targetDimensions:w(new V),frameBudget:w(0,"uint"),globalId:W},t=m`
			fn compute( targetDimensions: vec2u, frameBudget: u32, globalId: vec3u ) -> void {

				let rayDataStorage = &${e.rayDataStorage};
				let pixelQueue = &${e.pixelQueue};

				if ( globalId.x >= targetDimensions.x || globalId.y >= targetDimensions.y ) {

					return;

				}

				let rayCount = min( frameBudget, arrayLength( rayDataStorage ) );
				let pixelCount = targetDimensions.x * targetDimensions.y;
				if ( globalId.x == 0u && globalId.y == 0u ) {

					pixelQueue[ ${_s}u ] = 0u;
					pixelQueue[ ${jt}u ] = select( 0u, pixelCount - rayCount, pixelCount >= rayCount );

				}

				let pixelHash = ( globalId.x << 16 ) | globalId.y;
				let pixelIndex = globalId.x + globalId.y * targetDimensions.x;
				if ( pixelIndex < rayCount ) {

					rayDataStorage[ pixelIndex ].pixelIndex = pixelHash;
					rayDataStorage[ pixelIndex ].resultColor = vec4f( 0.0 );
					rayDataStorage[ pixelIndex ].throughputColor = vec3f( 0.0 );
					rayDataStorage[ pixelIndex ].objectIndex = - 1;
					rayDataStorage[ pixelIndex ].alphaDepth = 0u;
					rayDataStorage[ pixelIndex ].rayIntersectionIndex = - 1;
					rayDataStorage[ pixelIndex ].shadowRayIntersectionIndex = - 1;

				} else {

					pixelQueue[ ${mt}u + pixelIndex - rayCount ] = pixelHash;

				}

			}
		`;super(t(e)),this.defineUniformAccessors(e)}}class Fl extends k{constructor(){const e={envInfo:{value:null},backgroundInfo:{value:null},lightsInfo:{value:null},prevOutputTarget:j(We()).toReadOnly(),outputTarget:j(We()).toWriteOnly(),sampleCountTarget:j(Yt()).toReadWrite(),auxTarget:j(Ue()).toReadWrite(),misEnabled:w(1,"uint"),rayCount:w(0,"uint"),maxBounces:w(5,"uint"),clampDirect:w(0),clampIndirect:w(10),transmissiveBackground:w(Ya),accumulateAux:w(0,"uint"),rayDataStorage:_(new I(1,1),de),rayIntersectionsStorage:_(new I(1,1),sa),shadowRayIntersectionsStorage:_(new I(1,1),Ja),globalId:W},t=L("envInfo.value.totalSumNode",e),a=L("envInfo.value.intensityNode",e),r=L("envInfo.value.sampleColor",e),s=L("envInfo.value.sampleDir",e),i=L("envInfo.value.getDirPdf",e),o=L("envInfo.value.getWeight",e),l=L("backgroundInfo.value.sampleColor",e),u=L("lightsInfo.value.countNode",e),n=B("lightsInfo.value.randomLightSample",e),h=B("lightsInfo.value.intersectLightAtIndex",e),f=B("lightsInfo.value.getLightWeight",e),p=B("lightsInfo.value.getLightsWeight",e),d=B("lightsInfo.value.selectLight",e),g=B("lightsInfo.value.isLightVisibleToCamera",e),x=m`

			fn compute(
				// settings
				misEnabled: u32,
				rayCount: u32,
				maxBounces: u32,
				clampDirect: f32,
				clampIndirect: f32,
				transmissiveBackground: u32,
				accumulateAux: u32,

				globalId: vec3u
			) -> void {

				let rayDataStorage = &${e.rayDataStorage};
				let rayIntersectionsStorage = &${e.rayIntersectionsStorage};
				let shadowRayIntersectionsStorage = &${e.shadowRayIntersectionsStorage};

				// bound by "rayCount" rather than the pool length. See MaterialKernel
				let index = globalId.x;
				if ( index >= rayCount ) {

					return;

				}

				// skip slots that have never spawned a ray
				// whole structs are read from the buffer, not the pointer alias, which Safari fails to compile
				let input = ${e.rayDataStorage}[ index ];
				if ( input.rayIntersectionIndex < 0 ) {

					return;

				}

				let indexUV = vec2u( input.pixelIndex >> 16, input.pixelIndex & 0xFFFF );
				${Me}( indexUV, input.seed, input.currentBounce + input.alphaDepth + input.subsurfaceBounces );

				// one-sample NEE chooses between the analytic lights and the environment, matched with
				// the megakernel
				let envActive = ${t} > 0.0 && ${a} > 0.0;
				let lightsCount = ${u};
				var envWeight = 0.0;
				if ( envActive ) {

					envWeight = ${o}();

				}

				var resultColor = input.resultColor;
				var throughputColor = input.throughputColor;

				// added last, since a camera ray miss overwrites the pixel with the background
				var lightHits = vec3f( 0.0 );
				var cameraHitLight = false;

				// resolve the previous surface's NEE shadow ray (pre-scatter throughput). The index
				// is negative when no shadow ray was enqueued last frame
				if ( input.shadowRayIntersectionIndex >= 0 && input.lightPdf > 0.0 ) {

					let shadowHit = ${e.shadowRayIntersectionsStorage}[ u32( input.shadowRayIntersectionIndex ) ];
					let occluded = shadowHit.objectIndex >= 0;
					if ( ! occluded ) {

						// env + area lights are also found by bsdf rays, so MIS-weight them. Punctual lights, and lights
						// past the bounce limit, take full weight. Bsdf rays stopped by faces the shadow ray skipped can't
						// find the light, so their share of the weight moves to the light sample
						let isMISWeighted = ${es}( input.lightType ) && input.currentBounce < maxBounces;
						let misWeight = select( 1.0, mix( ${ye}( input.lightPdf, input.lightBsdfPdf ), 1.0, shadowHit.skippedOcclusion ), isMISWeighted );
						let directLight = throughputColor * input.lightEmission * input.lightBsdf * misWeight * ( 1.0 - shadowHit.occlusion ) / input.lightPdf;
						let contribution = ${z}( directLight, input.currentBounce, clampDirect, clampIndirect );
						resultColor += vec4f( contribution, 0.0 );

					}

				}

				// emission gathered at the previous surface (pre-scatter throughput). Found light clamps
				// at the depth of the segment that found it, as in Cycles, so one less than the current
				let emission = ${z}( throughputColor * input.emission, max( input.currentBounce, 1u ) - 1u, clampDirect, clampIndirect );
				resultColor += vec4f( emission, 0.0 );

				// reconstruct the scatter record staged by MaterialKernel
				var scatterRec: ${_e};
				scatterRec.color = input.scatterColor;
				scatterRec.pdf = input.scatterPdf;

				// the bounce limit, russian roulette, and terminating scatter checks all ran in
				// MaterialKernel, which stages a zeroed pdf and skips the bounce trace when they fire
				var isTerminated = all( throughputColor == vec3f( 0.0 ) ) || input.currentBounce >= maxBounces || ${ja}( scatterRec );

				// apply the scatter across the traced segment, including the weight of a medium walk
				if ( ! isTerminated ) {

					throughputColor *= scatterRec.color / scatterRec.pdf;

				}

				let isWalking = ! isTerminated && input.walkPending != 0u;
				if ( isWalking ) {

					// the walk hasn't reached a surface yet, so there's no hit to stage. Clear what was
					// resolved and let MediumKernel accumulate the walk's weight
					rayDataStorage[ index ].emission = vec3f( 0.0 );
					rayDataStorage[ index ].lightPdf = 0.0;
					rayDataStorage[ index ].shadowRayIntersectionIndex = - 1;
					rayDataStorage[ index ].scatterColor = vec3f( 1.0 );
					rayDataStorage[ index ].scatterPdf = 1.0;

				} else if ( ! isTerminated ) {

					let hitResult = ${e.rayIntersectionsStorage}[ u32( input.rayIntersectionIndex ) ];
					let didHit = hitResult.objectIndex >= 0;
					let surfaceDist = select( ${Fe}, hitResult.dist, didHit );

					// NEE's total weight at the vertex this segment left, for MIS. Camera segments have none,
					// and neither do scatter events in a medium
					let isMISWeighted = misEnabled != 0u && input.currentBounce > 0u && input.mediumScattered == 0u;
					var lightTotalWeight = 0.0;
					if ( isMISWeighted ) {

						lightTotalWeight = ${p}( input.origin ) + envWeight;

					}

					// forward hits on area lights along the traced segment, which starts "rayStart" along the ray.
					// Camera rays only see visibleToCameraRays lights, at full weight
					for ( var li = 0u; li < lightsCount; li ++ ) {

						if ( input.currentBounce == 0u && ! ${g}( li ) ) {

							continue;

						}

						var lightRec: ${me};
						if ( ${h}( input.origin, input.direction, li, &lightRec ) && lightRec.dist > input.rayStart && lightRec.dist < input.rayStart + surfaceDist ) {

							var misWeight = 1.0;
							if ( isMISWeighted ) {

								let selectionPdf = ${f}( li, input.origin ) / lightTotalWeight;
								misWeight = ${ye}( input.scatterPdf, lightRec.pdf * selectionPdf );

							}

							lightHits += ${z}( lightRec.emission * throughputColor * misWeight, input.currentBounce, clampDirect, clampIndirect );
							cameraHitLight = cameraHitLight || input.currentBounce == 0u;

						}

					}

					if ( didHit ) {

						// stage the hit for MaterialKernel
						rayDataStorage[ index ].barycoord = hitResult.barycoord;
						rayDataStorage[ index ].normal = hitResult.normal;
						rayDataStorage[ index ].side = hitResult.side;
						rayDataStorage[ index ].indices = hitResult.indices;
						rayDataStorage[ index ].objectIndex = hitResult.objectIndex;
						rayDataStorage[ index ].dist = hitResult.dist;

						// next event estimation: choose one light or the environment by its estimated
						// contribution. MaterialKernel evaluates the bsdf and enqueues the shadow ray.
						var lightPdf = 0.0;
						if ( misEnabled != 0u ) {

							let ruv = ${Ua}( ${Ui} );
							var selectionPdf = 0.0;
							let lightIndex = ${d}( hitResult.position, envWeight, ruv.x, &selectionPdf );
							if ( selectionPdf > 0.0 ) {

								var lightRec: ${me};
								if ( envActive && lightIndex == lightsCount ) {

									// the environment, sampled from its CDF, as a light of kind ENVIRONMENT
									let envSample = ${s}( ruv.yz );
									lightRec.direction = envSample.direction;
									lightRec.emission = envSample.color;
									lightRec.pdf = envSample.pdf;
									lightRec.dist = ${Fe};
									lightRec.lightType = ${Ka};

								} else {

									lightRec = ${n}( lightIndex, hitResult.position, ruv.yz );

								}

								lightPdf = lightRec.pdf * selectionPdf;
								rayDataStorage[ index ].lightDirection = lightRec.direction;
								rayDataStorage[ index ].lightEmission = lightRec.emission;
								rayDataStorage[ index ].lightDist = lightRec.dist;
								rayDataStorage[ index ].lightType = lightRec.lightType;

							}

						}

						rayDataStorage[ index ].lightPdf = lightPdf;

					} else {

						// the segment escaped the scene: gather the environment for opaque paths, or
						// the background for camera segments and fully transmissive paths
						if ( input.currentBounce > 0u && input.isFullyTransmissive == 0u ) {

							var misWeight = 1.0;
							if ( isMISWeighted && envActive ) {

								// match the env pdf scaling used by the NEE selection so the two estimators balance
								let envPdf = ${i}( input.direction ) * envWeight / lightTotalWeight;
								misWeight = ${ye}( input.scatterPdf, envPdf );

							}

							let environment = ${r}( input.direction ).rgb * throughputColor * misWeight;
							let contribution = ${z}( environment, input.currentBounce, clampDirect, clampIndirect );
							resultColor += vec4f( contribution, 0.0 );

						} else {

							// hit the background
							// support multiple transparent background blending techniques
							let rng = ${ne}( ${Vi} );
							let bg = ${l}( input.direction, rng );
							if ( input.currentBounce == 0u ) {

								// sample the background directly if this is the primary ray
								let background = ${z}( bg.a * bg.rgb, input.currentBounce, clampDirect, clampIndirect );
								resultColor = vec4f( background, bg.a );

							} else {

								// transmissive ray handling
								let env = ${r}( input.direction );
								let avg = saturate( dot( throughputColor, vec3f( 1.0 / 3.0 ) ) );
								let transparency = ( 1.0 - bg.a ) * avg;

								var misWeight = 1.0;
								if ( misEnabled != 0u && envActive ) {

									let envPdf = ${i}( input.direction );
									misWeight = ${ye}( input.scatterPdf, envPdf );

								}

								if ( transmissiveBackground == ${xs}u ) {

									// display the env map through transmissive surfaces
									let background = ${z}( env.rgb * throughputColor * misWeight, input.currentBounce, clampDirect, clampIndirect );
									resultColor = vec4f(
										resultColor.rgb + background,
										1.0,
									);

								} else if ( transmissiveBackground == ${vs}u ) {

									// fade the background by the throughput color average
									let background = ${z}( bg.a * bg.rgb * throughputColor * misWeight, input.currentBounce, clampDirect, clampIndirect );
									resultColor = vec4f(
										resultColor.rgb + background,
										1.0 - transparency,
									);

								} else {

									// fade the background by the throughput color average, mixing in env lighting
									var light = mix( env.rgb, bg.rgb, bg.a ) * misWeight;
									let background = ${z}( light * throughputColor, input.currentBounce, clampDirect, clampIndirect );
									resultColor = vec4f(
										resultColor.rgb + background,
										1.0 - transparency,
									);

								}

							}

						}

						isTerminated = true;

					}

				}

				// visible lights are opaque against a transparent background
				resultColor += vec4f( lightHits, 0.0 );
				if ( cameraHitLight ) {

					resultColor.a = 1.0;

				}

				// the color rows are stored top down to match a rasterized render target
				let colorIndex = vec2u( indexUV.x, textureDimensions( ${e.outputTarget} ).y - 1u - indexUV.y );
				let storedSamples = textureLoad( ${e.sampleCountTarget}, indexUV ).r & ${ft}u;

				if ( isTerminated ) {

					// blend the finished sample into the output and free the slot for a new camera ray
					let sampleCount = storedSamples + 1;
					let prevColor = textureLoad( ${e.prevOutputTarget}, colorIndex );
					let blendedColor = ${Zi}( prevColor, resultColor, 1.0 / f32( sampleCount ) );
					textureStore( ${e.sampleCountTarget}, indexUV, vec4( ${Za}u | sampleCount ) );
					textureStore( ${e.outputTarget}, colorIndex, blendedColor );

					// the auxiliary images are blended the same way, in the same row order
					if ( accumulateAux != 0u ) {

						var auxPacked: vec3u;
						for ( var layer = 0u; layer < ${oe}u; layer ++ ) {

							auxPacked[ layer ] = textureLoad( ${e.auxTarget}, colorIndex, layer ).r;

						}

						let albedo = unpack4x8unorm( input.auxAlbedo ).rgb;
						let normal = unpack4x8snorm( input.auxNormal ).xyz;
						auxPacked = ${Ni}( auxPacked, albedo, normal, 1.0 / f32( sampleCount ) );
						for ( var layer = 0u; layer < ${oe}u; layer ++ ) {

							textureStore( ${e.auxTarget}, colorIndex, layer, vec4u( auxPacked[ layer ] ) );

						}

					}

					rayDataStorage[ index ].objectIndex = - 1;

				} else {

					// show the path so far, which the first sample overwrites
					if ( storedSamples == 0u ) {

						textureStore( ${e.outputTarget}, colorIndex, resultColor );

					}

					rayDataStorage[ index ].resultColor = resultColor;
					rayDataStorage[ index ].throughputColor = throughputColor;

				}

			}
		`;super(x(e)),this.defineUniformAccessors(e)}}class Pl extends k{constructor(){const e={material:{value:null},seed:w(0,"uint"),targetDimensions:w(new V),maxSamples:w(0,"uint"),rayCount:w(0,"uint"),filterGlossy:w(1),maxTransparentBounces:w(5,"uint"),maxBounces:w(5,"uint"),sampleCountTarget:j(Yt()).toReadWrite(),rayDataStorage:_(new I(1,1),de),rayQueue:_(new I(1,1),je),shadowRayQueue:_(new I(1,1),je),queueCounters:_(new I(1,1),"uint").toAtomic(),pixelQueue:_(new I(1,1),"uint").toAtomic(),globalId:W},t=q("bvhData.fns.getCameraRay"),a=q("bvhData.fns.sampleTrianglePoint"),r=q("bvhData.fns.getSurfaceRecord"),s=B("material.value.bsdfSample",e),i=B("material.value.bsdfEvalPdf",e),o=ee("bvhData.storage.materials"),l=ee("bvhData.storage.transforms"),u=m`

			fn compute(
				seed: u32,
				targetDimensions: vec2u,
				maxSamples: u32,
				rayCount: u32,
				filterGlossy: f32,
				maxTransparentBounces: u32,
				maxBounces: u32,

				globalId: vec3u
			) -> void {

				let rayDataStorage = &${e.rayDataStorage};
				let rayQueue = &${e.rayQueue};
				let shadowRayQueue = &${e.shadowRayQueue};
				let queueCounters = &${e.queueCounters};
				let pixelQueue = &${e.pixelQueue};

				// bound by "rayCount" rather than the pool length. The dispatch rounds up to the
				// workgroup size and those extra slots hold a zeroed pixel index
				let index = globalId.x;
				if ( index >= rayCount ) {

					return;

				}

				// whole structs are read from the buffer, not the pointer alias, which Safari fails to compile
				let input = ${e.rayDataStorage}[ index ];
				if ( input.objectIndex < 0 ) {

					// the slot's path has terminated: recycle the pixel through the overflow queue and
					// generate a fresh camera ray
					var pixelIndex = input.pixelIndex;
					let elementCount = atomicLoad( &pixelQueue[ ${jt}u ] );
					if ( elementCount > 0u ) {

						// TODO: If we've pulled off a pixel that's already finished we currently just
						// write a no-op ray, wasting a frame. It may be better to iterate over a few
						// points in the queue to see if we can find one we can use.
						let queueIndex = atomicAdd( &pixelQueue[ ${_s}u ], 1u ) % elementCount;
						pixelIndex = atomicExchange( &pixelQueue[ ${mt}u + queueIndex ], pixelIndex );

					}

					let indexUV = vec2u( pixelIndex >> 16, pixelIndex & 0xFFFF );

					// skip the pixel if it has hit the sample limit
					let combinedField = textureLoad( ${e.sampleCountTarget}, indexUV ).r;
					let samples = ( ${ft}u & combinedField );
					let isComplete = maxSamples != 0u && samples >= maxSamples;

					if ( isComplete ) {

						rayDataStorage[ index ].pixelIndex = pixelIndex;
						rayDataStorage[ index ].rayIntersectionIndex = - 1;
						rayDataStorage[ index ].shadowRayIntersectionIndex = - 1;
						return;

					}

					${Me}( indexUV, seed + samples, 0 );

					let uv = vec2f( indexUV ) / vec2f( targetDimensions );
					let jitteredUv = uv + ${ne}( ${Oi} ) / vec2f( targetDimensions );
					var ray: ${R};
					if ( ! ${t}( jitteredUv, vec2f( targetDimensions ), &ray ) ) {

						// the camera declined the pixel, so leave the slot dormant for this round. With a
						// sample cap the pixel counts as finished, since it will never take a sample
						// TODO: same as above - this work is a bit wasteful and leaves slots empty for
						// a frame. Is it possible to quickly skip rays outside the mask or are finished?
						if ( maxSamples != 0u ) {

							textureStore( ${e.sampleCountTarget}, indexUV, vec4( ( combinedField & ~${ft}u ) | maxSamples ) );

						}

						rayDataStorage[ index ].pixelIndex = pixelIndex;
						rayDataStorage[ index ].rayIntersectionIndex = - 1;
						rayDataStorage[ index ].shadowRayIntersectionIndex = - 1;
						return;

					}

					ray.direction = normalize( ray.direction );

					let rayIndex = atomicAdd( &queueCounters[ ${Ve}u ], 1u );
					rayQueue[ rayIndex ].origin = ray.origin;
					rayQueue[ rayIndex ].direction = ray.direction;
					rayQueue[ rayIndex ].pixelIndex = pixelIndex;
					rayQueue[ rayIndex ].rngIndex = 0u;
					rayQueue[ rayIndex ].seed = seed + samples;
					rayQueue[ rayIndex ].maxDist = ray.maxDist;

					rayDataStorage[ index ].origin = ray.origin;
					rayDataStorage[ index ].direction = ray.direction;
					rayDataStorage[ index ].pixelIndex = pixelIndex;
					rayDataStorage[ index ].seed = seed + samples;
					rayDataStorage[ index ].currentBounce = 0u;
					rayDataStorage[ index ].throughputColor = vec3f( 1.0 );
					rayDataStorage[ index ].resultColor = vec4f( 0.0, 0.0, 0.0, 1.0 );
					rayDataStorage[ index ].scatterColor = vec3f( 1.0 );
					rayDataStorage[ index ].scatterPdf = 1.0;
					rayDataStorage[ index ].minPdf = 1.0;
					rayDataStorage[ index ].isFullyTransmissive = 1u;
					rayDataStorage[ index ].emission = vec3f( 0.0 );
					rayDataStorage[ index ].lightPdf = 0.0;
					rayDataStorage[ index ].alphaDepth = 0u;
					rayDataStorage[ index ].rayStart = 0.0;
					rayDataStorage[ index ].maxDist = ray.maxDist;
					rayDataStorage[ index ].rayIntersectionIndex = i32( rayIndex );
					rayDataStorage[ index ].shadowRayIntersectionIndex = - 1;
					rayDataStorage[ index ].dispersionWavelength = - mix( ${ta}.0, ${aa}.0, ${$e}( ${ji} ) );
					rayDataStorage[ index ].auxAlbedo = 0u;
					rayDataStorage[ index ].auxNormal = 0u;
					rayDataStorage[ index ].subsurfaceBounces = 0u;
					rayDataStorage[ index ].walkPending = 0u;
					rayDataStorage[ index ].mediumScattered = 0u;
					rayDataStorage[ index ].medium.inside = 0u;

					// write the active params & dispatched flag
					textureStore( ${e.sampleCountTarget}, indexUV, vec4( ${ul}u | ${Za}u | samples ) );

				} else if ( input.walkPending == 0u ) {

					// evaluate the surface staged by LogicKernel. Paths still walking a medium have none
					let indexUV = vec2u( input.pixelIndex >> 16, input.pixelIndex & 0xFFFF );
					${Me}( indexUV, input.seed, input.currentBounce + input.alphaDepth + input.subsurfaceBounces );

					// the medium the path is in, which the bsdf sample may enter or exit
					var medium = ${as}( input.medium );
					let segmentInMedium = medium.inside;

					let objectInfo = ${l}[ u32( input.objectIndex ) ];
					var materialInfo = ${o}[ objectInfo.materialIndex ];

					// a matte surface hit by the camera ray renders as a fully transparent
					let isMatte = materialInfo.matte != 0 && input.currentBounce == 0u;
					if ( isMatte ) {

						rayDataStorage[ index ].resultColor = vec4f( 0.0 );
						rayDataStorage[ index ].throughputColor = vec3f( 0.0 );
						rayDataStorage[ index ].emission = vec3f( 0.0 );
						rayDataStorage[ index ].lightPdf = 0.0;
						rayDataStorage[ index ].shadowRayIntersectionIndex = - 1;
						return;

					}

					// apply per-object colors
					materialInfo.color *= objectInfo.color.rgb;
					materialInfo.opacity *= objectInfo.color.a;

					var vertexData = ${a}( input.barycoord, input.indices );
					vertexData.normal = normalize( transpose( objectInfo.inverseMatrixWorld ) * vertexData.normal );
					vertexData.tangent = vec4f( ( objectInfo.matrixWorld * vec4f( vertexData.tangent.xyz, 0.0 ) ).xyz, vertexData.tangent.w );
					vertexData.position = objectInfo.matrixWorld * vertexData.position;

					let view = - input.direction;

					// blur glossy surfaces after low-probability bounces to suppress fireflies,
					// from the Cycles "filter glossy" approach in integrator/surface_shader.h
					let blurRoughness = sqrt( clamp( 1.0 - filterGlossy * input.minPdf, 0.0, 1.0 ) ) * 0.5;

					var surface = ${r}( materialInfo, vertexData, input.side, input.normal, view, blurRoughness );

					// Stochastically pass through partially transparent surfaces by re-enqueueing
					// the ray at the hit point, advancing the alpha depth but not the bounce count.
					let passesThrough = ${$e}( ${Ki} ) > surface.opacity;
					if ( passesThrough ) {

						// out of transparent bounces, so stop rather than shading a surface that
						// should be invisible. A zeroed throughput terminates in LogicKernel.
						if ( input.alphaDepth >= maxTransparentBounces ) {

							rayDataStorage[ index ].throughputColor = vec3f( 0.0 );
							rayDataStorage[ index ].emission = vec3f( 0.0 );
							rayDataStorage[ index ].lightPdf = 0.0;
							rayDataStorage[ index ].shadowRayIntersectionIndex = - 1;
							return;

						}

						let alphaOrigin = ${Ce}( vertexData.position.xyz, input.direction, input.normal );
						if ( segmentInMedium ) {

							// inside a medium, MediumKernel walks on past the surface, from the surface
							rayDataStorage[ index ].walkPending = 1u;
							rayDataStorage[ index ].origin = alphaOrigin;
							rayDataStorage[ index ].rayStart = 0.0;

						} else {

							let alphaIndex = atomicAdd( &queueCounters[ ${Ve}u ], 1u );
							rayQueue[ alphaIndex ].origin = alphaOrigin;
							rayQueue[ alphaIndex ].direction = input.direction;
							rayQueue[ alphaIndex ].pixelIndex = input.pixelIndex;
							rayQueue[ alphaIndex ].rngIndex = input.currentBounce + input.alphaDepth + 1u + input.subsurfaceBounces;
							rayQueue[ alphaIndex ].seed = input.seed;
							// the origin advanced to the hit point, so the remaining budget shrinks by the
							// distance already traced
							rayQueue[ alphaIndex ].maxDist = max( input.maxDist - input.dist, 0.0 );
							rayDataStorage[ index ].rayIntersectionIndex = i32( alphaIndex );

							// the ray keeps its origin, and only the queued traversal starts past the surface
							rayDataStorage[ index ].rayStart = input.rayStart + input.dist;

						}

						// the surface is skipped, so no scatter or emission is staged for LogicKernel.
						// "pdf" is left alone so the previous scatter still weights the forward MIS,
						// and "bsdf" matches it so applying the scatter leaves the throughput as is.
						rayDataStorage[ index ].alphaDepth = input.alphaDepth + 1u;
						rayDataStorage[ index ].emission = vec3f( 0.0 );
						rayDataStorage[ index ].scatterColor = vec3f( input.scatterPdf );
						rayDataStorage[ index ].lightPdf = 0.0;
						rayDataStorage[ index ].shadowRayIntersectionIndex = - 1;
						return;

					}

					// apply the hero wavelength to dispersive surfaces, folding the spectral weight
					// into the throughput at the path's first dispersive interaction
					var throughputColor = input.throughputColor;
					let isDispersive = materialInfo.dispersion > 0.0 && surface.ior > 1.0 && surface.transmission > 0.0 && ! surface.thinWall;
					if ( isDispersive ) {

						let wavelength = abs( input.dispersionWavelength );
						${hs}( &surface, materialInfo.dispersion, wavelength );
						if ( input.dispersionWavelength < 0.0 ) {

							rayDataStorage[ index ].dispersionWavelength = wavelength;
							throughputColor *= ${fs}( wavelength );
							rayDataStorage[ index ].throughputColor = throughputColor;

						}

					}

					// attenuate the light transmitted through the volume when exiting a backface so
					// the surface's emission and NEE resolve against the attenuated throughput. MediumKernel
					// already applied a scattering medium's transmittance
					if ( input.side < 0.0 && materialInfo.transmission > 0.0 && ! segmentInMedium ) {

						throughputColor *= ${ds}( input.dist, materialInfo.attenuationColor, materialInfo.attenuationDistance );
						rayDataStorage[ index ].throughputColor = throughputColor;

					}

					// sample the next bounce direction and stage the scatter state for LogicKernel
					var scatterRec = ${s}( view, surface );
					let newBounce = input.currentBounce + 1u;

					// The first surface the path scatters off fills the denoiser's auxiliary images. Until one is
					// found the last mirror or transmission hit stands in, for paths that reach the environment.
					// The albedo is tinted by the throughput of the surfaces looked past to reach it. The packed
					// albedo's alpha marks the surface found
					let auxFound = unpack4x8unorm( input.auxAlbedo ).a != 0.0;
					if ( ! auxFound ) {

						let isAuxSurface = ${Bi}( surface, scatterRec );
						let auxAlbedo = saturate( throughputColor * surface.color );
						rayDataStorage[ index ].auxAlbedo = pack4x8unorm( vec4f( auxAlbedo, select( 0.0, 1.0, isAuxSurface ) ) );
						rayDataStorage[ index ].auxNormal = pack4x8snorm( vec4f( surface.normal, 0.0 ) );

					}

					// decide termination now so finished paths skip the bounce trace entirely - a
					// zeroed pdf reads as a terminating scatter in LogicKernel, which still resolves
					// the surface's emission and NEE before freeing the slot
					var isTerminated = newBounce >= maxBounces || all( scatterRec.color == vec3f( 0.0 ) ) || ${ja}( scatterRec );

					// russian roulette early out:
					// Matches Cycles path_state_continuation_probability in integrator/path_state.h
					if ( ! isTerminated && newBounce >= 3u ) {

						let rrThroughput = throughputColor * scatterRec.color / scatterRec.pdf;
						let rrProb = saturate( sqrt( max( max( rrThroughput.r, rrThroughput.g ), rrThroughput.b ) ) );
						isTerminated = rrProb <= 0.0 || ${$e}( ${qi} ) > rrProb;
						if ( ! isTerminated ) {

							// fold the survival boost into the scatter color so LogicKernel's
							// throughput update applies it without a separate division
							scatterRec.color /= rrProb;

						}

					}

					// Write the ray storage content here since things like the emissive value is read
					// in the logic kernel on the subsequent frame.
					rayDataStorage[ index ].scatterColor = scatterRec.color;
					rayDataStorage[ index ].scatterPdf = select( scatterRec.pdf, 0.0, isTerminated );
					rayDataStorage[ index ].minPdf = min( input.minPdf, scatterRec.pdf );
					rayDataStorage[ index ].isFullyTransmissive = input.isFullyTransmissive & select( 0u, 1u, scatterRec.isTransmissive );
					rayDataStorage[ index ].emission = surface.emission;
					rayDataStorage[ index ].currentBounce = newBounce;
					rayDataStorage[ index ].mediumScattered = 0u;

					// As in "KHR_materials_scatter", the surface bsdf is the medium's boundary: refracting out
					// ends the walk, reflecting continues it
					if ( segmentInMedium && u32( input.objectIndex ) == medium.object && input.side < 0.0 && scatterRec.isTransmissive ) {

						medium.inside = false;

					}

					// refracting into a front face of a scattering material starts a random walk inside it
					if ( scatterRec.isTransmissive && ! surface.thinWall && input.side > 0.0 ) {

						let entered = ${rs}( materialInfo, u32( input.objectIndex ) );
						if ( entered.inside ) {

							medium = entered;

						}

					}

					// keep the medium the path left or entered
					if ( segmentInMedium || medium.inside ) {

						// a whole struct is written to the buffer, not through the pointer alias, which Safari fails to compile
						${e.rayDataStorage}[ index ].medium = ${Co}( medium );

					}

					// the NEE shadow ray below still resolves the surface's direct light, so only
					// the bounce segment is skipped for finished paths. Inside a medium, MediumKernel walks it
					if ( ! isTerminated && medium.inside ) {

						rayDataStorage[ index ].walkPending = 1u;
						rayDataStorage[ index ].origin = ${Ce}( vertexData.position.xyz, scatterRec.direction, input.normal );
						rayDataStorage[ index ].direction = scatterRec.direction;
						rayDataStorage[ index ].rayStart = 0.0;

					} else if ( ! isTerminated ) {

						let rayIndex = atomicAdd( &queueCounters[ ${Ve}u ], 1u );
						rayQueue[ rayIndex ].origin = ${Ce}( vertexData.position.xyz, scatterRec.direction, input.normal );
						rayQueue[ rayIndex ].direction = scatterRec.direction;
						rayQueue[ rayIndex ].pixelIndex = input.pixelIndex;
						rayQueue[ rayIndex ].rngIndex = newBounce + input.alphaDepth + input.subsurfaceBounces;
						rayQueue[ rayIndex ].seed = input.seed;
						rayQueue[ rayIndex ].maxDist = 0.0;
						rayDataStorage[ index ].rayIntersectionIndex = i32( rayIndex );

						rayDataStorage[ index ].origin = rayQueue[ rayIndex ].origin;
						rayDataStorage[ index ].direction = scatterRec.direction;
						rayDataStorage[ index ].rayStart = 0.0;

					}

					// evaluate the bsdf toward the light LogicKernel selected and enqueue the shadow ray.
					// the light pdf will be 0 if NEE is disabled.
					var lightPdf = input.lightPdf;
					if ( lightPdf > 0.0 ) {

						let evalRec = ${i}( view, input.lightDirection, surface );
						if ( evalRec.pdf > 0.0 ) {

							rayDataStorage[ index ].lightBsdf = evalRec.color;
							rayDataStorage[ index ].lightBsdfPdf = evalRec.pdf;

							let shadowIndex = atomicAdd( &queueCounters[ ${er}u ], 1u );
							shadowRayQueue[ shadowIndex ].origin = ${Ce}( vertexData.position.xyz, input.lightDirection, input.normal );
							shadowRayQueue[ shadowIndex ].direction = input.lightDirection;
							shadowRayQueue[ shadowIndex ].pixelIndex = input.pixelIndex;
							shadowRayQueue[ shadowIndex ].rngIndex = input.currentBounce + input.alphaDepth + input.subsurfaceBounces;
							shadowRayQueue[ shadowIndex ].seed = input.seed;
							shadowRayQueue[ shadowIndex ].maxDist = input.lightDist * ( 1.0 - ${Ji} );
							rayDataStorage[ index ].shadowRayIntersectionIndex = i32( shadowIndex );

						} else {

							lightPdf = 0.0;

						}

					}

					if ( lightPdf <= 0.0 ) {

						rayDataStorage[ index ].lightPdf = 0.0;
						rayDataStorage[ index ].shadowRayIntersectionIndex = - 1;

					}

				}

			}
		`;super(u(e)),this.defineUniformAccessors(e)}}class Bl extends k{constructor(){const e={rayQueue:_(new I(1,1),je),queueCounters:_(new I(1,1),"uint"),rayIntersectionsStorage:_(new I(1,1),sa),globalId:W},t=ee("bvhData.fns.raycastFirstHit.outputType"),a=ee("bvhData.fns.raycastFirstHit"),r=m`

			fn compute( globalId: vec3u ) -> void {

				let rayQueue = &${e.rayQueue};
				let queueCounters = &${e.queueCounters};
				let rayIntersectionsStorage = &${e.rayIntersectionsStorage};

				let index = globalId.x;
				if ( index >= queueCounters[ ${Ve}u ] ) {

					return;

				}

				// whole structs are read from the buffer, not the pointer alias, which Safari fails to compile
				let queuedRay = ${e.rayQueue}[ index ];
				let indexUV = vec2u( queuedRay.pixelIndex >> 16, queuedRay.pixelIndex & 0xFFFF );
				${Me}( indexUV, queuedRay.seed, queuedRay.rngIndex );

				let ray = Ray( queuedRay.origin, queuedRay.direction, queuedRay.maxDist );
				var hitResult: ${t};
				if ( ${a}( ray, &hitResult ) ) {

					rayIntersectionsStorage[ index ].barycoord = hitResult.barycoord;
					rayIntersectionsStorage[ index ].objectIndex = i32( hitResult.objectIndex );
					rayIntersectionsStorage[ index ].position = ray.origin + ray.direction * hitResult.dist;
					rayIntersectionsStorage[ index ].dist = hitResult.dist;
					rayIntersectionsStorage[ index ].normal = hitResult.normal.xyz;
					rayIntersectionsStorage[ index ].side = hitResult.side;
					rayIntersectionsStorage[ index ].indices = hitResult.indices.xyz;

				} else {

					rayIntersectionsStorage[ index ].objectIndex = - 1;

				}

			}
		`;super(r(e)),this.defineUniformAccessors(e)}}class Nl extends k{constructor(){const e={shadowRayQueue:_(new I(1,1),je),queueCounters:_(new I(1,1),"uint"),shadowRayIntersectionsStorage:_(new I(1,1),Ja),globalId:W},t=ee("bvhData.fns.raycastFirstHit.outputType"),a=ee("bvhData.fns.raycastShadow"),r=m`

			fn compute( globalId: vec3u ) -> void {

				let shadowRayQueue = &${e.shadowRayQueue};
				let queueCounters = &${e.queueCounters};
				let shadowRayIntersectionsStorage = &${e.shadowRayIntersectionsStorage};

				let index = globalId.x;
				if ( index >= queueCounters[ ${er}u ] ) {

					return;

				}

				// whole structs are read from the buffer, not the pointer alias, which Safari fails to compile
				let queuedRay = ${e.shadowRayQueue}[ index ];
				let indexUV = vec2u( queuedRay.pixelIndex >> 16, queuedRay.pixelIndex & 0xFFFF );
				${Me}( indexUV, queuedRay.seed, queuedRay.rngIndex );

				let ray = Ray( queuedRay.origin, queuedRay.direction, queuedRay.maxDist );
				var hitResult: ${t};
				let occluded = ${a}( ray, &hitResult );
				shadowRayIntersectionsStorage[ index ].objectIndex = select( - 1, i32( hitResult.objectIndex ), occluded );
				shadowRayIntersectionsStorage[ index ].skippedOcclusion = hitResult.skippedOcclusion;
				shadowRayIntersectionsStorage[ index ].occlusion = hitResult.occlusion;

			}
		`;super(r(e)),this.defineUniformAccessors(e)}}class Al extends k{constructor(){const e={maxSubsurfaceBounces:w(256,"uint"),stepsPerPass:w(16,"uint"),rayCount:w(0,"uint"),rayDataStorage:_(new I(1,1),de),mediumQueue:_(new I(1,1),"uint"),rayIntersectionsStorage:_(new I(1,1),sa),globalId:W},t=ee("bvhData.fns.raycastFirstHit.outputType"),a=ee("bvhData.fns.raycastFirstHit"),r=m`

			fn compute( maxSubsurfaceBounces: u32, stepsPerPass: u32, rayCount: u32, globalId: vec3u ) -> void {

				let rayDataStorage = &${e.rayDataStorage};
				let mediumQueue = &${e.mediumQueue};
				let rayIntersectionsStorage = &${e.rayIntersectionsStorage};

				if ( globalId.x >= mediumQueue[ ${tr}u ] ) {

					return;

				}

				let index = mediumQueue[ ${qt}u + globalId.x ];
				// whole structs are read from the buffer, not the pointer alias, which Safari fails to compile
				let input = ${e.rayDataStorage}[ index ];
				let medium = ${as}( input.medium );

				let indexUV = vec2u( input.pixelIndex >> 16, input.pixelIndex & 0xFFFF );
				${Me}( indexUV, input.seed, input.currentBounce + input.alphaDepth + input.subsurfaceBounces );

				var ray = Ray( input.origin, input.direction, 0.0 );
				var weight = input.scatterColor;
				var subsurfaceBounces = input.subsurfaceBounces;
				var hasScattered = false;
				var isFinished = false;
				var isTerminated = false;

				for ( var i = 0u; i < stepsPerPass; i ++ ) {

					// only trace up to the sampled scatter event
					let channelPdf = ${is}( input.throughputColor * weight, medium.albedo );
					let scatterDist = ${ss}( medium, channelPdf, ${ne}( ${Gi} ) );
					ray.maxDist = scatterDist;

					var hitResult: ${t};
					let didHit = ${a}( ray, &hitResult );
					let surfaceDist = select( ${Fe}, hitResult.dist, didHit );

					let scattered = scatterDist < surfaceDist;
					let segmentDist = select( surfaceDist, scatterDist, scattered );
					let transmittance = exp( - medium.extinction * segmentDist );
					let distancePdf = dot( channelPdf, ${ns}( medium, segmentDist, scattered ) );
					if ( distancePdf <= 0.0 ) {

						isTerminated = true;
						break;

					}

					if ( ! scattered ) {

						// reaching the surface, weighted by the chance of not scattering before it
						weight *= transmittance / distancePdf;

						// The hit fills the ray results from the back, by the walk's medium queue position, while the
						// traced rays fill them from the front. A path slot walking a medium queued no ray this round,
						// so the two ranges never exceed the slot count or overlap
						let resultIndex = rayCount - 1u - globalId.x;
						rayIntersectionsStorage[ resultIndex ].barycoord = hitResult.barycoord;
						// a walk that leaves without hitting anything is a miss, as in the trace kernel
						rayIntersectionsStorage[ resultIndex ].objectIndex = select( - 1, i32( hitResult.objectIndex ), didHit );
						rayIntersectionsStorage[ resultIndex ].position = ray.origin + ray.direction * hitResult.dist;
						rayIntersectionsStorage[ resultIndex ].dist = hitResult.dist;
						rayIntersectionsStorage[ resultIndex ].normal = hitResult.normal.xyz;
						rayIntersectionsStorage[ resultIndex ].side = hitResult.side;
						rayIntersectionsStorage[ resultIndex ].indices = hitResult.indices.xyz;
						rayDataStorage[ index ].rayIntersectionIndex = i32( resultIndex );

						isFinished = true;
						break;

					}

					weight *= medium.albedo * medium.extinction * transmittance / distancePdf;
					ray.origin += ray.direction * scatterDist;
					ray.direction = ${Yi}( ray.direction, medium.anisotropy, ${ne}( ${Qi} ) );
					hasScattered = true;

					// capped separately from bounces, and ends once the throughput is negligible
					subsurfaceBounces ++;
					let throughput = input.throughputColor * weight / input.scatterPdf;
					if ( subsurfaceBounces >= maxSubsurfaceBounces || max( max( throughput.r, throughput.g ), throughput.b ) < ${ts} ) {

						isTerminated = true;
						break;

					}

					${zt}();

				}

				// a zeroed pdf terminates the path in LogicKernel
				rayDataStorage[ index ].scatterColor = weight;
				rayDataStorage[ index ].scatterPdf = select( input.scatterPdf, 0.0, isTerminated );
				rayDataStorage[ index ].origin = ray.origin;
				rayDataStorage[ index ].direction = ray.direction;
				rayDataStorage[ index ].subsurfaceBounces = subsurfaceBounces;
				rayDataStorage[ index ].walkPending = select( 1u, 0u, isFinished || isTerminated );
				if ( hasScattered ) {

					rayDataStorage[ index ].mediumScattered = 1u;
					rayDataStorage[ index ].isFullyTransmissive = 0u;

				}

			}
		`;super(r(e)),this.defineUniformAccessors(e)}}class Ll extends k{constructor(){const e={rayCount:w(0,"uint"),rayDataStorage:_(new I(1,1),de).toReadOnly(),mediumQueue:_(new I(1,1),"uint").toAtomic(),globalId:W},t=m`

			fn compute( rayCount: u32, globalId: vec3u ) -> void {

				let rayDataStorage = &${e.rayDataStorage};
				let mediumQueue = &${e.mediumQueue};

				let index = globalId.x;
				if ( index >= rayCount ) {

					return;

				}

				if ( rayDataStorage[ index ].walkPending != 0u && rayDataStorage[ index ].objectIndex >= 0 ) {

					let queueIndex = atomicAdd( &mediumQueue[ ${tr}u ], 1u );
					atomicStore( &mediumQueue[ ${qt}u + queueIndex ], index );

				}

			}
		`;super(t(e)),this.defineUniformAccessors(e)}}class ya extends k{constructor(e=Ve,t=64){const a={queueCounters:_(new I(1,1),"uint").toAtomic(),outputDispatch:_(new si(3,1),"u32").setName("outputDispatch")},r=m`
			fn compute() -> void {

				let queueCounters = &${a.queueCounters};
				let outputDispatch = &${a.outputDispatch};

				let queueLength = atomicLoad( &queueCounters[ ${e}u ] );
				outputDispatch[ 0 ] = ( queueLength + ${t-1}u ) / ${t}u;
				outputDispatch[ 1 ] = 1u;
				outputDispatch[ 2 ] = 1u;

			}
		`;super(r(a)),this.defineUniformAccessors(a)}}class kl extends k{constructor(){const e={rayDataStorage:_(new I(1,1),de),pixelQueue:_(new I(1,1),"uint").toAtomic(),start:w(0,"uint"),end:w(0,"uint"),addingSlots:w(0,"uint"),globalId:W},t=m`
			fn compute( start: u32, end: u32, addingSlots: u32, globalId: vec3u ) -> void {

				let rayDataStorage = &${e.rayDataStorage};
				let pixelQueue = &${e.pixelQueue};

				let index = start + globalId.x;
				if ( index >= end ) {

					return;

				}

				if ( addingSlots == 0u ) {

					// slots being removed hand their pixel back before the pool is discarded
					let queueIndex = atomicAdd( &pixelQueue[ ${jt}u ], 1u );
					atomicStore( &pixelQueue[ ${mt}u + queueIndex ], rayDataStorage[ index ].pixelIndex );

				} else {

					// the pool never exceeds the pixel count, so the queue holds enough for every new slot
					let previousCount = atomicSub( &pixelQueue[ ${jt}u ], 1u );
					rayDataStorage[ index ].pixelIndex = atomicLoad( &pixelQueue[ ${mt}u + previousCount - 1u ] );
					rayDataStorage[ index ].resultColor = vec4f( 0.0 );
					rayDataStorage[ index ].throughputColor = vec3f( 0.0 );
					rayDataStorage[ index ].objectIndex = - 1;
					rayDataStorage[ index ].alphaDepth = 0u;
					rayDataStorage[ index ].rayIntersectionIndex = - 1;
					rayDataStorage[ index ].shadowRayIntersectionIndex = - 1;

				}

			}
		`;super(t(e)),this.defineUniformAccessors(e)}}class El extends k{constructor(e={}){const{type:t="u32"}=e,a={globalId:W,outputTarget:_(new si(1,1),t)},r=m`
			fn compute( globalId: vec3u ) -> void {

				${a.outputTarget}[ globalId.x ] = 0;

			}
		`;super(r(a)),this.defineUniformAccessors({target:a.outputTarget})}}class zl extends k{constructor(e){const t={source:_(new I(1,1),e).toReadOnly(),target:_(new I(1,1),e),count:w(0,"uint"),globalId:W},a=m`
			fn compute( count: u32, globalId: vec3u ) -> void {

				let index = globalId.x;
				if ( index >= count ) {

					return;

				}

				${t.target}[ index ] = ${t.source}[ index ];

			}
		`;super(a(t)),this.defineUniformAccessors(t)}}const Hl=0,Ol=1,Vl=2,Wl=3,Ul=4,qr=5,ql=4294967296,Rs=new $({minSamples:{type:"uint",atomic:!0},maxSamples:{type:"uint",atomic:!0},totalLo:{type:"uint",atomic:!0},totalHi:{type:"uint",atomic:!0},pixelCount:{type:"uint",atomic:!0}},"SampleCounters");class jl extends k{constructor(){const e={counters:_(new I(1,1),Rs)},t=m`
			fn compute() -> void {

				atomicStore( &${e.counters}[ 0 ].minSamples, 0xFFFFFFFFu );
				atomicStore( &${e.counters}[ 0 ].maxSamples, 0u );
				atomicStore( &${e.counters}[ 0 ].totalLo, 0u );
				atomicStore( &${e.counters}[ 0 ].totalHi, 0u );
				atomicStore( &${e.counters}[ 0 ].pixelCount, 0u );

			}
		`;super(t(e)),this.defineUniformAccessors(e)}}class Gl extends k{constructor(){const e={globalId:W,counters:_(new I(1,1),Rs),sampleCountTarget:j(new pe(1,1)).toReadOnly()},t=m`
			fn compute( globalId: vec3u ) -> void {

				let targetDimensions = textureDimensions( ${e.sampleCountTarget} );
				if ( globalId.x >= targetDimensions.x || globalId.y >= targetDimensions.y ) {

					return;

				}

				// pixels without a camera ray aren't part of the image, so skip rather than count zero
				let combinedField = textureLoad( ${e.sampleCountTarget}, globalId.xy ).r;
				if ( ( combinedField & ${Za}u ) == 0u ) {

					return;

				}

				let samples = combinedField & ${ft}u;

				atomicMin( &${e.counters}[ 0 ].minSamples, samples );
				atomicMax( &${e.counters}[ 0 ].maxSamples, samples );
				atomicAdd( &${e.counters}[ 0 ].pixelCount, 1u );

				// the sum overflowed if it came out smaller than the value already there, so carry
				// the wrap into "totalHi"
				let previousTotal = atomicAdd( &${e.counters}[ 0 ].totalLo, samples );
				if ( previousTotal + samples < previousTotal ) {

					atomicAdd( &${e.counters}[ 0 ].totalHi, 1u );

				}

			}
		`;super(t(e)),this.defineUniformAccessors(e)}}const Ql=134217728,jr=Math.floor(Ql/(de.getLength()*4)),Kl=5;class Gr extends Ts{constructor(e){super(e),this.seed=0,this.mediumStepsPerPass=16,this.envInfo=new ys,this.backgroundInfo=new bs,this.lightsInfo=new Ss,this.rayCount=0,this.rayDataStorage=null,this.rayQueue=null,this.shadowRayQueue=null,this.queueCounters=new I(new Uint32Array(va),1),this.queueCounters.name="Queue Counters",this.rayIntersectionsStorage=null,this.shadowRayIntersectionsStorage=null,this.mediumQueue=null,this.pixelQueue=null,this.sampleCountersStorage=new I(new Uint32Array(qr),qr),this.sampleCountersStorage.name="Sample Counters",this._samplesPromise=null,this.populatePixelIndicesKernel=new Ml().setWorkgroupSize(8,8,1),this.logicKernel=new Fl().setWorkgroupSize(64,1,1),this.materialKernel=new Pl().setWorkgroupSize(64,1,1),this.traceRayKernel=new Bl().setWorkgroupSize(64,1,1),this.traceShadowRayKernel=new Nl().setWorkgroupSize(64,1,1),this.mediumKernel=new Al().setWorkgroupSize(64,1,1),this.queueMediumWalksKernel=new Ll().setWorkgroupSize(64,1,1),this.rayDispatchConverter=new ya(Ve).setWorkgroupSize(1,1,1),this.shadowDispatchConverter=new ya(er).setWorkgroupSize(1,1,1),this.mediumDispatchConverter=new ya(tr).setWorkgroupSize(1,1,1),this.primeSampleCountersKernel=new jl().setWorkgroupSize(1,1,1),this.tallySampleCountsKernel=new Gl().setWorkgroupSize(8,8,1),this.resetSlotsKernel=new kl().setWorkgroupSize(64,1,1),this.copyRayDataKernel=new zl(de).setWorkgroupSize(64,1,1),this.logicKernel.envInfo=this.envInfo,this.logicKernel.backgroundInfo=this.backgroundInfo,this.logicKernel.lightsInfo=this.lightsInfo,this.zeroDispatchKernel=new El().setWorkgroupSize(1,1,1)}resetSeed(){this.seed=0}reset(){super.reset(),this._samplesPromise=null}setBVHData(e){this.materialKernel.context.bvhData=e,this.materialKernel.needsUpdate=!0,this.traceRayKernel.context.bvhData=e,this.traceRayKernel.needsUpdate=!0,this.traceShadowRayKernel.context.bvhData=e,this.traceShadowRayKernel.needsUpdate=!0,this.mediumKernel.context.bvhData=e,this.mediumKernel.needsUpdate=!0,this.reset()}rebuild(){super.rebuild(),this.materialKernel.needsUpdate=!0,this.reset()}setRandom(e){this.logicKernel.context.random=e,this.logicKernel.needsUpdate=!0,this.materialKernel.context.random=e,this.materialKernel.needsUpdate=!0,this.traceRayKernel.context.random=e,this.traceRayKernel.needsUpdate=!0,this.traceShadowRayKernel.context.random=e,this.traceShadowRayKernel.needsUpdate=!0,this.mediumKernel.context.random=e,this.mediumKernel.needsUpdate=!0,this.reset()}setMaterial(e){this.materialKernel.material=e.getData(),this.materialKernel.needsUpdate=!0,this.reset()}setFilterGlossy(e){this.materialKernel.filterGlossy=e===0?ls:1/e,this.reset()}setClamping(e,t){this.logicKernel.clampDirect=e,this.logicKernel.clampIndirect=t,this.reset()}setTransmissiveBackground(e){this.logicKernel.transmissiveBackground=e,this.reset()}setEnvironment(e){this.envInfo.updateFrom(e)}setLights(e){this.lightsInfo.updateFrom(this.renderer,e),this.reset()}setEnvironmentParams(e,t){const{envInfo:a}=this,r=new N().makeRotationFromEuler(t).invert();a.rotationNode.value.setFromMatrix4(r),a.intensityNode.value=e}setMultipleImportanceSampling(e){this.logicKernel.misEnabled=e?1:0,this.reset()}setBackground(e){const{backgroundInfo:t}=this;t.dispose(),t.map=e}setBackgroundParams(e,t,a){const{backgroundInfo:r}=this,s=new N().makeRotationFromEuler(t).invert();r.rotationNode.value.copy(s),r.intensity=e,r.blur=a}dispose(){var e,t,a,r,s,i,o;super.dispose(),this.envInfo.dispose(),this.lightsInfo.dispose(),(e=this.rayDataStorage)==null||e.dispose(),(t=this.rayQueue)==null||t.dispose(),(a=this.shadowRayQueue)==null||a.dispose(),this.queueCounters.dispose(),(r=this.rayIntersectionsStorage)==null||r.dispose(),(s=this.shadowRayIntersectionsStorage)==null||s.dispose(),(i=this.mediumQueue)==null||i.dispose(),this.sampleCountersStorage.dispose(),(o=this.pixelQueue)==null||o.dispose(),this.rayDispatchConverter.outputDispatch.dispose(),this.shadowDispatchConverter.outputDispatch.dispose(),this.mediumDispatchConverter.outputDispatch.dispose(),this.populatePixelIndicesKernel.dispose(),this.logicKernel.dispose(),this.materialKernel.dispose(),this.traceRayKernel.dispose(),this.traceShadowRayKernel.dispose(),this.mediumKernel.dispose(),this.queueMediumWalksKernel.dispose(),this.rayDispatchConverter.dispose(),this.shadowDispatchConverter.dispose(),this.mediumDispatchConverter.dispose(),this.primeSampleCountersKernel.dispose(),this.tallySampleCountsKernel.dispose(),this.resetSlotsKernel.dispose(),this.copyRayDataKernel.dispose(),this.zeroDispatchKernel.dispose()}_updatePixelQueue(e,t){var r;const a=mt+Math.max(e*t,1);(!this.pixelQueue||this.pixelQueue.array.length<a)&&((r=this.pixelQueue)==null||r.dispose(),this.pixelQueue=new I(new Float32Array(a),a),this.pixelQueue.name="Pixel Queue",this.materialKernel.pixelQueue=this.pixelQueue,this.populatePixelIndicesKernel.pixelQueue=this.pixelQueue,this.resetSlotsKernel.pixelQueue=this.pixelQueue)}_resizePool(e,t){var x,y,b,T,S,C;const{resetSlotsKernel:a,copyRayDataKernel:r}=this,s=this.rayCount,i=Math.min(s,t),o=Math.min(e,t);a.pixelQueue=this.pixelQueue,o<i&&(a.rayDataStorage=this.rayDataStorage,a.start=o,a.end=i,a.addingSlots=!1,this.dispatch(a,a.getDispatchSize(i-o,1,1)));const l=new I(e,de.getLength());l.name="Ray Data";const u=new I(e,je.getLength());u.name="Ray Queue";const n=new I(e,je.getLength());n.name="Shadow Ray Queue";const h=new I(e,sa.getLength());h.name="Ray Intersections";const f=new I(e,Ja.getLength());f.name="Shadow Ray Intersections";const p=qt+e,d=new I(new Uint32Array(p),p);d.name="Medium Queue";const g=Math.min(e,s);g>0&&(r.source=this.rayDataStorage,r.target=l,r.count=g,this.dispatch(r,r.getDispatchSize(g,1,1))),(x=this.rayDataStorage)==null||x.dispose(),(y=this.rayQueue)==null||y.dispose(),(b=this.shadowRayQueue)==null||b.dispose(),(T=this.rayIntersectionsStorage)==null||T.dispose(),(S=this.shadowRayIntersectionsStorage)==null||S.dispose(),(C=this.mediumQueue)==null||C.dispose(),this.rayDataStorage=l,this.rayQueue=u,this.shadowRayQueue=n,this.rayIntersectionsStorage=h,this.shadowRayIntersectionsStorage=f,this.mediumQueue=d,this.rayCount=e,o>i&&(a.rayDataStorage=l,a.start=i,a.end=o,a.addingSlots=!0,this.dispatch(a,a.getDispatchSize(o-i,1,1)))}_getRequestedSlotCount(){return Math.min(jr,Math.max(1,Math.floor(this.frameBudget)))}_getPreviewIterations(){return Math.max(1,Math.min(this.maxBounces,Kl))}getPreviewPixelBudget(){return Math.min(this.frameBudget/this._getPreviewIterations(),jr)}_applyBudget(e){const t=this._getRequestedSlotCount();t!==this.rayCount&&this._resizePool(t,e)}*createRenderTask(){const{renderer:e,maxTransparentBounces:t,logicKernel:a,materialKernel:r,traceRayKernel:s,traceShadowRayKernel:i,mediumKernel:o,queueMediumWalksKernel:l,rayDispatchConverter:u,shadowDispatchConverter:n,mediumDispatchConverter:h,zeroDispatchKernel:f,populatePixelIndicesKernel:p}=this,d=new V;this.getSize(d),this._updatePixelQueue(d.x,d.y);const g=d.x*d.y;for(this._applyBudget(g),yield*this.compileKernels([a,r,s,i,o,l,u,n,h,f,p]),f.target=this.queueCounters,this.dispatch(f,[va]),p.rayDataStorage=this.rayDataStorage,p.pixelQueue=this.pixelQueue,p.frameBudget=Math.min(this.rayCount,g),p.targetDimensions.copy(d),this.dispatch(p,p.getDispatchSize(d.x,d.y,1)),this.seed++;;){const x=Math.min(this._getRequestedSlotCount(),g),y=this.lowResMode?this._getPreviewIterations():1,b=Math.max(y,Math.round(this.frameBudget/x));for(let T=0;T<b;T++){e.copyTextureToTexture(this.outputTarget,this.prevOutputTarget),[this.outputTarget,this.prevOutputTarget]=[this.prevOutputTarget,this.outputTarget],a.prevOutputTarget=this.prevOutputTarget,a.outputTarget=this.outputTarget,a.sampleCountTarget=this.sampleCountTarget,a.auxTarget=this.auxTarget??this._auxPlaceholder,a.accumulateAux=this.auxTarget?1:0,a.rayDataStorage=this.rayDataStorage,a.rayIntersectionsStorage=this.rayIntersectionsStorage,a.shadowRayIntersectionsStorage=this.shadowRayIntersectionsStorage,a.maxBounces=this.maxBounces,a.rayCount=Math.min(this.rayCount,g),this.dispatch(a,a.getDispatchSize(a.rayCount,1,1)),this._applyBudget(g);const{rayDataStorage:S,rayQueue:C,shadowRayQueue:P,queueCounters:F,rayIntersectionsStorage:A,shadowRayIntersectionsStorage:X,mediumQueue:E}=this,Y=Math.min(this.rayCount,g);f.target=F,this.dispatch(f,[va]),f.target=E,this.dispatch(f,[qt]),r.rayDataStorage=S,r.rayQueue=C,r.shadowRayQueue=P,r.queueCounters=F,r.pixelQueue=this.pixelQueue,r.sampleCountTarget=this.sampleCountTarget,r.seed=this.seed,r.maxSamples=this.maxSamples,r.rayCount=Y,r.maxTransparentBounces=t,r.maxBounces=this.maxBounces,r.targetDimensions.copy(d),this.dispatch(r,r.getDispatchSize(Y,1,1)),u.queueCounters=F,this.dispatch(u,[1,1,1]),s.rayQueue=C,s.queueCounters=F,s.rayIntersectionsStorage=A,this.dispatch(s,u.outputDispatch),n.queueCounters=F,this.dispatch(n,[1,1,1]),i.shadowRayQueue=P,i.queueCounters=F,i.shadowRayIntersectionsStorage=X,this.dispatch(i,n.outputDispatch),l.rayDataStorage=S,l.mediumQueue=E,l.rayCount=Y,this.dispatch(l,l.getDispatchSize(Y,1,1)),h.queueCounters=E,this.dispatch(h,[1,1,1]),o.rayDataStorage=S,o.mediumQueue=E,o.rayIntersectionsStorage=A,o.rayCount=Y,o.maxSubsurfaceBounces=this.maxSubsurfaceBounces,o.stepsPerPass=this.mediumStepsPerPass,this.dispatch(o,h.outputDispatch)}yield}}getSampleCountsAsync(){if(this._samplesPromise===null){const e=this._measureSampleCounts().finally(()=>{this._samplesPromise===e&&(this._samplesPromise=null)});this._samplesPromise=e}return this._samplesPromise}async _measureSampleCounts(){const{renderer:e,sampleCountTarget:t,sampleCountersStorage:a,primeSampleCountersKernel:r,tallySampleCountsKernel:s}=this;if(!e.initialized||this.lowResMode)return{min:0,max:0,avg:0};r.counters=a,e.compute(r.kernel,[1,1,1]),s.counters=a,s.sampleCountTarget=t,e.compute(s.kernel,s.getDispatchSize(t.width,t.height));const i=await e.getArrayBufferAsync(a),o=new Uint32Array(i),l=o[Ul];if(l===0)return{min:0,max:0,avg:0};const u=o[Wl]*ql+o[Vl];return{min:o[Hl],max:o[Ol],avg:u/l}}}const Xl=`

	// TODO: possibly this should be renamed something related to material or path tracing logic

	#ifndef RAY_OFFSET
	#define RAY_OFFSET 1e-4
	#endif

	// adjust the hit point by the surface normal by a factor of some offset and the
	// maximum component-wise value of the current point to accommodate floating point
	// error as values increase.
	vec3 stepRayOrigin( vec3 rayOrigin, vec3 rayDirection, vec3 offset, float dist ) {

		vec3 point = rayOrigin + rayDirection * dist;
		vec3 absPoint = abs( point );
		float maxPoint = max( absPoint.x, max( absPoint.y, absPoint.z ) );
		return point + offset * ( maxPoint + 1.0 ) * RAY_OFFSET;

	}

	// https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_materials_volume/README.md#attenuation
	vec3 transmissionAttenuation( float dist, vec3 attColor, float attDist ) {

		vec3 ot = - log( attColor ) / attDist;
		return exp( - ot * dist );

	}

	vec3 getHalfVector( vec3 wi, vec3 wo, float eta ) {

		// get the half vector - assuming if the light incident vector is on the other side
		// of the that it's transmissive.
		vec3 h;
		if ( wi.z > 0.0 ) {

			h = normalize( wi + wo );

		} else {

			// Scale by the ior ratio to retrieve the appropriate half vector
			// From Section 2.2 on computing the transmission half vector:
			// https://blog.selfshadow.com/publications/s2015-shading-course/burley/s2015_pbs_disney_bsdf_notes.pdf
			h = normalize( wi + wo * eta );

		}

		h *= sign( h.z );
		return h;

	}

	vec3 getHalfVector( vec3 a, vec3 b ) {

		return normalize( a + b );

	}

	// The discrepancy between interpolated surface normal and geometry normal can cause issues when a ray
	// is cast that is on the top side of the geometry normal plane but below the surface normal plane. If
	// we find a ray like that we ignore it to avoid artifacts.
	// This function returns if the direction is on the same side of both planes.
	bool isDirectionValid( vec3 direction, vec3 surfaceNormal, vec3 geometryNormal ) {

		bool aboveSurfaceNormal = dot( direction, surfaceNormal ) > 0.0;
		bool aboveGeometryNormal = dot( direction, geometryNormal ) > 0.0;
		return aboveSurfaceNormal == aboveGeometryNormal;

	}

	// ray sampling x and z are swapped to align with expected background view
	vec2 equirectDirectionToUv( vec3 direction ) {

		// from Spherical.setFromCartesianCoords
		vec2 uv = vec2( atan( direction.z, direction.x ), acos( direction.y ) );
		uv /= vec2( 2.0 * PI, PI );

		// apply adjustments to get values in range [0, 1] and y right side up
		uv.x += 0.5;
		uv.y = 1.0 - uv.y;
		return uv;

	}

	vec3 equirectUvToDirection( vec2 uv ) {

		// undo above adjustments
		uv.x -= 0.5;
		uv.y = 1.0 - uv.y;

		// from Vector3.setFromSphericalCoords
		float theta = uv.x * 2.0 * PI;
		float phi = uv.y * PI;

		float sinPhi = sin( phi );

		return vec3( sinPhi * cos( theta ), cos( phi ), sinPhi * sin( theta ) );

	}

	// power heuristic for multiple importance sampling
	float misHeuristic( float a, float b ) {

		float aa = a * a;
		float bb = b * b;
		return aa / ( aa + bb );

	}

	// tentFilter from Peter Shirley's 'Realistic Ray Tracing (2nd Edition)' book, pg. 60
	// erichlof/THREE.js-PathTracing-Renderer/
	float tentFilter( float x ) {

		return x < 0.5 ? sqrt( 2.0 * x ) - 1.0 : 1.0 - sqrt( 2.0 - ( 2.0 * x ) );

	}
`;class Yl extends fn{constructor(){super({uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:`
				varying vec2 vUv;
				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`
				#define ENVMAP_TYPE_CUBE_UV

				uniform samplerCube envMap;
				uniform float flipEnvMap;
				varying vec2 vUv;

				#include <common>
				#include <cube_uv_reflection_fragment>

				${Xl}

				void main() {

					vec3 rayDirection = equirectUvToDirection( vUv );
					rayDirection.x *= flipEnvMap;
					gl_FragColor = textureCube( envMap, rayDirection );

				}`}),this.depthWrite=!1,this.depthTest=!1}}class Zl{constructor(e){this._renderer=e,this._quad=new He(new Yl)}generate(e,t=null,a=null){if(!e.isCubeTexture)throw new Error("CubeToEquirectMaterial: Source can only be cube textures.");const r=e.images[0],s=this._renderer,i=this._quad;t===null&&(t=4*r.height),a===null&&(a=2*r.height);const o=new dn(t,a,{type:Be,colorSpace:r.colorSpace}),l=r.height,u=Math.log2(l)-2,n=1/l,h=1/(3*Math.max(Math.pow(2,u),7*16));i.material.defines.CUBEUV_MAX_MIP=`${u}.0`,i.material.defines.CUBEUV_TEXEL_WIDTH=h,i.material.defines.CUBEUV_TEXEL_HEIGHT=n,i.material.uniforms.envMap.value=e,i.material.uniforms.flipEnvMap.value=e.isRenderTargetTexture?1:-1,i.material.needsUpdate=!0;const f=s.getRenderTarget(),p=s.autoClear;s.autoClear=!0,s.setRenderTarget(o),i.render(s),s.setRenderTarget(f),s.autoClear=p;const d=new Uint16Array(t*a*4),g=new Float32Array(t*a*4);s.readRenderTargetPixels(o,0,0,t,a,g),o.dispose();for(let y=0,b=g.length;y<b;y++)d[y]=se.toHalfFloat(g[y]);const x=new K(d,t,a,ae,G);return x.minFilter=hn,x.magFilter=O,x.wrapS=be,x.wrapT=be,x.mapping=xi,x.needsUpdate=!0,x}dispose(){this._quad.dispose()}}function Jl(c,e){return c.uuid<e.uuid?1:c.uuid>e.uuid?-1:0}function ec(c){return`${c.source.uuid}:${c.colorSpace}`}function tc(c){const e=[];return c.traverseVisible(t=>{(t.isRectAreaLight||t.isSpotLight||t.isPointLight||t.isDirectionalLight||t.isSunLight)&&e.push(t)}),e.sort(Jl)}const et=new De,Bt=new $({matrixWorld:"mat4x4f",inverseMatrixWorld:"mat4x4f",visible:"uint",materialIndex:"uint",visibleToShadowRays:"uint",_alignment0:"uint",color:"vec4f"},"TransformStruct"),Nt=new $({indices:"vec4u",normal:"vec3f",didHit:"bool",barycoord:"vec3f",objectIndex:"uint",side:"float",dist:"float",skippedOcclusion:"float",occlusion:"float"},"PathTracerIntersectionResult");class ac extends Qn{constructor(e,t={}){super(e,{attributes:{position:"vec4f",normal:"vec4f",tangent:"vec4f",color:"vec4f",uv:"vec4f"},...t}),this.structs.transform=Bt,this.structs.material=Pi,this.storage.materials=null,this.materialsMap=new Map,this.materials=[],this.bvhMap=new Map,this.textureAtlas=new ws}updateUvAttributesFromScene(){const{attributes:e}=this,t=new Set(["color"]);for(let a=0;a<8;a++){const r=a===0?"uv":"uv"+a;delete e[r],t.add(r)}this.getRootObject().traverse(a=>{if(a.geometry)for(const r in a.geometry.attributes)t.has(r)&&(e[r]="vec4f")})}updateUvSampleFunction(){const{structs:e,fns:t}=this,a=[];let r=null;e.attributes.membersLayout.forEach(({name:s})=>{if(/^uv/.test(s)){const i=s==="uv"?0:Number(s.replace(/^uv/,""));a.push(`
					case ${i}u: {

						return vertexData.${s}.xy;

					}
				`),r===null&&(r=`vertexData.${s}.xy`)}}),t.getUvFromChannel=m`
			fn getUvFromChannel( vertexData: ${e.attributes}, packed: i32 ) -> vec2f {

				// the uv channel is packed into bits 23-25 of the "*Map" descriptor
				let channel = u32( ( packed >> 23 ) & 0x7 );
				switch ( channel ) {

					${a.join(`
`)}
					default: {

						return ${r??"vec2f( 0.0 )"};

					}

				}

			}
		`}updateColorSampleFn(){const{structs:e,fns:t}=this;!!e.attributes.membersLayout.find(({name:r})=>r==="color")?t.getColor=m`
				fn getColor( vertexData: ${e.attributes} ) -> vec4f {

					return vertexData.color;

				}
			`:t.getColor=m`
				fn getColor( vertexData: ${e.attributes} ) -> vec4f {

					return vec4f( 1.0 );

				}
			`}useTransparencyRaycastFn(){const{textureAtlas:e,storage:t,fns:a}=this,r=e.texture,s=Ht(e.textureInfo,"uvec4").setName("bvh_textureInfo"),i=Xi(s,te(r));a.getSurfaceRecord=Bo(i,a.getUvFromChannel,a.getColor);const o=Pe().toVar("bvh_materialIndex"),l=ce(1).toVar("bvh_rayScalar"),u=ce(1).toVar("bvh_baseOpacity"),n=sr(!1).toVar("bvh_isShadowRay"),h=sr(!1).toVar("bvh_skipShadowObject"),f={shapeStruct:R,resultStruct:Nt,boundsOrderFn:m`
				fn getBoundsOrder( ray: ${R}, splitAxis: u32, node: ${Ne} ) -> bool {

					return ray.direction[ splitAxis ] >= 0.0;

				}
			`,intersectsBoundsFn:m`
				fn rayIntersectsBounds( ray: ${R}, bounds: ${ge}, result: ptr<function, ${Nt}> ) -> u32 {

					// early-out if our object is completely transparent, or a shadow ray is already occluded
					if ( ${u} == 0.0 || ( ${n} && result.didHit ) ) {

						return 0u;

					}

					let boundsMin = vec3( bounds.min[0], bounds.min[1], bounds.min[2] );
					let boundsMax = vec3( bounds.max[0], bounds.max[1], bounds.max[2] );

					let invDir = 1.0 / ray.direction;
					let tMinPlane = ( boundsMin - ray.origin ) * invDir;
					let tMaxPlane = ( boundsMax - ray.origin ) * invDir;

					let tMinHit = min( tMinPlane, tMaxPlane );
					let tMaxHit = max( tMinPlane, tMaxPlane );

					let t0 = max( max( tMinHit.x, tMinHit.y ), tMinHit.z );
					let t1 = min( min( tMaxHit.x, tMaxHit.y ), tMaxHit.z );

					let dist = max( t0, 0.0 );
					if ( t1 < dist ) {

						return 0u;

					} else if ( ray.maxDist > 0.0 && dist * ${l} >= ray.maxDist ) {

						return 0u;

					} else if ( result.didHit && dist * ${l} >= result.dist ) {

						return 0u;

					} else {

						return 1u;

					}

				}

			`,intersectRangeFn:m`
				fn intersectRange( ray: ${R}, offset: u32, count: u32, result: ptr<function, ${Nt}> ) -> bool {

					var didHit = false;
					for ( var ti = offset; ti < offset + count; ti = ti + 1u ) {

						let i0 = ${t.index}[ ti * 3u ];
						let i1 = ${t.index}[ ti * 3u + 1u ];
						let i2 = ${t.index}[ ti * 3u + 2u ];

						let a = ${t.attributes}[ i0 ].position.xyz;
						let b = ${t.attributes}[ i1 ].position.xyz;
						let c = ${t.attributes}[ i2 ].position.xyz;

						var triResult = ${ka}( ray, a, b, c, 0.0 );
						triResult.dist *= ${l};
						if ( triResult.didHit && ( ray.maxDist <= 0.0 || triResult.dist < ray.maxDist ) && ( ! result.didHit || triResult.dist < result.dist ) ) {

							let material = ${t.materials}[ ${o} ];

							// TODO: if material is a transmissive volume we may need to assume double-sidedness
							// shadow rays hit both sides
							if ( ! ${n} && material.side != 0 && triResult.side != material.side ) {

								continue;

							}

							var opacity = ${u};
							if ( material.transparent != 0 || material.alphaTest > 0.0 ) {

								// add support for vertex color opacity
								if ( material.vertexColors == 1 ) {

									let barycoord = triResult.barycoord;
									let a = ${a.getColor}( ${t.attributes}[ i0 ] );
									let b = ${a.getColor}( ${t.attributes}[ i1 ] );
									let c = ${a.getColor}( ${t.attributes}[ i2 ] );
									let col = barycoord.x * a + barycoord.y * b + barycoord.z * c;

									opacity *= col.a;

								}

								// account for alpha component of albedo map
								if ( material.map != - 1 ) {

									let barycoord = triResult.barycoord;
									let a = ${a.getUvFromChannel}( ${t.attributes}[ i0 ], material.map );
									let b = ${a.getUvFromChannel}( ${t.attributes}[ i1 ], material.map );
									let c = ${a.getUvFromChannel}( ${t.attributes}[ i2 ], material.map );
									let uv = barycoord.x * a + barycoord.y * b + barycoord.z * c;
									let uvPrime = material.mapTransform * vec3f( uv, 1 );

									opacity *= ${i}( uvPrime.xy, material.map, 0 ).a;

								}

								// account for green component of alpha map
								if ( material.alphaMap != - 1 ) {

									let barycoord = triResult.barycoord;
									let a = ${a.getUvFromChannel}( ${t.attributes}[ i0 ], material.alphaMap );
									let b = ${a.getUvFromChannel}( ${t.attributes}[ i1 ], material.alphaMap );
									let c = ${a.getUvFromChannel}( ${t.attributes}[ i2 ], material.alphaMap );
									let uv = barycoord.x * a + barycoord.y * b + barycoord.z * c;
									let uvPrime = material.alphaMapTransform * vec3f( uv, 1 );

									opacity *= ${i}( uvPrime.xy, material.alphaMap, 0 ).g;

								}

								// Opacity is resolved at surface processing but skip full transparent hits here.
								if ( material.transparent != 0 && opacity <= 0.0 ) {

									continue;

								}

								if ( opacity < material.alphaTest ) {

									continue;

								}

							}

							// shadow rays skip the objects not visible to them. Record the share of bsdf rays this face
							// would stop: all of them if it's opaque, its opacity if it's partially transparent
							if ( ${h} ) {

								if ( material.side == 0 || triResult.side == material.side ) {

									result.skippedOcclusion += ( 1.0 - result.skippedOcclusion ) * select( 1.0, opacity, material.transparent != 0 );

								}

								continue;

							}

							// shadow rays pass partially transparent surfaces, each blocking its opacity's share of the
							// light still getting through, just as bsdf rays pass them by chance
							if ( ${n} && material.transparent != 0 && opacity < 1.0 ) {

								result.occlusion += ( 1.0 - result.occlusion ) * opacity;
								continue;

							}

							result.didHit = true;
							result.dist = triResult.dist;
							result.normal = triResult.normal;
							result.side = triResult.side;
							result.barycoord = triResult.barycoord;
							result.indices = vec4u( i0, i1, i2, ti );

							didHit = true;

						}

					}

					return didHit;

				}
			`,transformShapeFn:m`
				fn transformRay( ray: ptr<function, ${R}>, objectIndex: u32 ) -> void {

					let toLocal = ${t.transforms}[ objectIndex ].inverseMatrixWorld;
					ray.origin = ( toLocal * vec4f( ray.origin, 1.0 ) ).xyz;
					ray.direction = ( toLocal * vec4f( ray.direction, 0.0 ) ).xyz;

					let len = length( ray.direction );
					ray.direction /= len;
					${l} = 1.0 / len;

					let object = ${t.transforms}[ objectIndex ];
					${o} = object.materialIndex;

					let material = ${t.materials}[ object.materialIndex ];
					if ( material.transparent == 1 ) {

						${u} = material.opacity * object.color.a;

					} else {

						${u} = 1.0;

					}

					${h} = ${n} && object.visibleToShadowRays == 0u;

				}
			`,transformResultFn:m`
				fn transformResult( hit: ptr<function, ${Nt}>, objectIndex: u32 ) -> void {

					let toLocal = ${t.transforms}[ objectIndex ].inverseMatrixWorld;
					hit.normal = normalize( ( transpose( toLocal ) * vec4f( hit.normal, 0.0 ) ).xyz );
					hit.objectIndex = objectIndex;

				}
			`,resetShapeFn:m`
				fn resetRayScalar( objectIndex: u32 ) -> void {

					${l} = 1.0;
					${u} = 1.0;

				}
			`};a.raycastFirstHit=this.getShapecastFn({...f,name:"raycastFirstHit",prefixFn:m`
				fn initFirstHitCull() -> void {

					${n} = false;

				}
			`}),a.raycastShadow=this.getShapecastFn({...f,name:"raycastShadow",prefixFn:m`
				fn initShadowCull() -> void {

					${n} = true;

				}
			`})}update(){const{structs:e}=this,t=new I(new Uint8Array,e.material.getLength());this.storage.materials=_(t,e.material).toReadOnly().setName("bvh_materials"),this.updateUvAttributesFromScene(),this.updateMaterialsMap(),super.update(),this.updateUvSampleFunction(),this.updateColorSampleFn(),this.updateMaterials(),this.bvhMap.clear(),this.useTransparencyRaycastFn()}updateMaterialsMap(){const{materials:e,materialsMap:t}=this;t.clear(),e.length=0,this.getRootObject().traverse(r=>{r.material&&(Array.isArray(r.material)?r.material.forEach(s=>s&&a(s)):a(r.material))}),e.sort((r,s)=>r.uuid<s.uuid?1:-1).forEach((r,s)=>{t.set(r,s)});function a(r){t.has(r)||(e.push(r),t.set(r,-1))}}updateMaterials(){this.updateMaterialsMap();const{materials:e,storage:t,structs:a,bvh:r}=this,{materialData:s,textures:i}=this.writeMaterialsBuffer(e),o=t.materials.proxyNode,l=t.transforms.proxyNode,u=s.length/a.material.getLength();o.value.count<u&&(o.value.dispose(),o.value=new I(s,a.material.getLength())),o.value.array.set(s),o.value.needsUpdate=!0,this._getTransformMap(r).forEach(n=>{this.writeMaterialData(n,n.slot,l.value.array.buffer)}),l.value.needsUpdate=!0,this.textures=i}writeMaterialsBuffer(e){function t(f){switch(f){case be:return 0;case Vt:return 1;case xn:return 2;default:return 0}}function a(f,p){if(p in f&&f[p]){const d=f[p],g=ec(d);o.has(g)||(o.set(g,o.size),l.push(d));const x=o.get(g),y=d.channel&7,b=t(d.wrapS),T=t(d.wrapT);return(d.magFilter===ht?1:0)<<30|T<<28|b<<26|y<<23|x&8388607}else return-1}function r(f,p,d){return p in f?f[p]:d}function s(f,p,d,g){const x=f[p]&&f[p].isTexture?f[p]:null;if(x){x.matrixAutoUpdate&&x.updateMatrix();const y=x.matrix.elements;for(let b=0;b<3;b++)d[g+4*b+0]=y[3*b+0],d[g+4*b+1]=y[3*b+1],d[g+4*b+2]=y[3*b+2],d[g+4*b+3]=0}return 12}let i=0;const o=new Map,l=[],u=Math.max(e.length,2),n=new Float32Array(u*this.structs.material.getLength()),h=new Int32Array(n.buffer);for(let f=0,p=e.length;f<p;f++){const d=e[f];n[i++]=d.color.r,n[i++]=d.color.g,n[i++]=d.color.b,h[i++]=a(d,"map"),n[i++]=r(d,"metalness",0),h[i++]=a(d,"metalnessMap"),n[i++]=r(d,"roughness",0),h[i++]=a(d,"roughnessMap"),n[i++]=r(d,"ior",1.5),n[i++]=r(d,"transmission",0),h[i++]=a(d,"transmissionMap"),n[i++]=r(d,"emissiveIntensity",0),"emissive"in d?(n[i++]=d.emissive.r,n[i++]=d.emissive.g,n[i++]=d.emissive.b):(n[i++]=0,n[i++]=0,n[i++]=0),h[i++]=a(d,"emissiveMap"),h[i++]=a(d,"normalMap"),i++,"normalScale"in d?(n[i++]=d.normalScale.x,n[i++]=d.normalScale.y):(n[i++]=1,n[i++]=1),n[i++]=r(d,"clearcoat",0),h[i++]=a(d,"clearcoatMap"),h[i++]=a(d,"clearcoatNormalMap"),i++,"clearcoatNormalScale"in d?(n[i++]=d.clearcoatNormalScale.x,n[i++]=d.clearcoatNormalScale.y):(n[i++]=1,n[i++]=1),n[i++]=r(d,"clearcoatRoughness",0),h[i++]=a(d,"clearcoatRoughnessMap"),h[i++]=a(d,"iridescenceMap"),h[i++]=a(d,"iridescenceThicknessMap"),n[i++]=r(d,"iridescence",0),n[i++]=r(d,"iridescenceIOR",1.3),n[i++]=r(d,"iridescenceThicknessMinimum",100),n[i++]=r(d,"iridescenceThicknessMaximum",400),n[i++]=r(d,"diffuseRoughness",0),n[i++]=r(d,"dispersion",0),"specularColor"in d?(n[i++]=d.specularColor.r,n[i++]=d.specularColor.g,n[i++]=d.specularColor.b):(n[i++]=1,n[i++]=1,n[i++]=1),h[i++]=a(d,"specularColorMap"),n[i++]=r(d,"specularIntensity",1),h[i++]=a(d,"specularIntensityMap");const g=r(d,"thickness",0)===0&&r(d,"attenuationDistance",1/0)===1/0;if(h[i++]=Number(g),i++,"attenuationColor"in d?(n[i++]=d.attenuationColor.r,n[i++]=d.attenuationColor.g,n[i++]=d.attenuationColor.b):(n[i++]=1,n[i++]=1,n[i++]=1),n[i++]=r(d,"attenuationDistance",1/0),h[i++]=a(d,"alphaMap"),h[i++]=Number(r(d,"castShadow",!0)),n[i++]=d.opacity,n[i++]=d.alphaTest,!g&&d.transmission>0)n[i++]=0;else switch(d.side){case ni:n[i++]=1;break;case oi:n[i++]=-1;break;case mn:n[i++]=0;break}h[i++]=Number(r(d,"matte",!1)),n[i++]=r(d,"sheen",0),i++,"sheenColor"in d?(n[i++]=d.sheenColor.r,n[i++]=d.sheenColor.g,n[i++]=d.sheenColor.b):(n[i++]=0,n[i++]=0,n[i++]=0),h[i++]=a(d,"sheenColorMap"),n[i++]=r(d,"sheenRoughness",0),h[i++]=a(d,"sheenRoughnessMap"),h[i++]=Number(d.vertexColors),h[i++]=Number(d.flatShading),h[i++]=Number(d.transparent),h[i++]=0,n[i++]=r(d,"anisotropy",0),n[i++]=r(d,"anisotropyRotation",0),h[i++]=a(d,"anisotropyMap"),i++,i++,i++,i+=s(d,"map",n,i),i+=s(d,"metalnessMap",n,i),i+=s(d,"roughnessMap",n,i),i+=s(d,"transmissionMap",n,i),i+=s(d,"emissiveMap",n,i),i+=s(d,"normalMap",n,i),i+=s(d,"clearcoatMap",n,i),i+=s(d,"clearcoatNormalMap",n,i),i+=s(d,"clearcoatRoughnessMap",n,i),i+=s(d,"sheenColorMap",n,i),i+=s(d,"sheenRoughnessMap",n,i),i+=s(d,"iridescenceMap",n,i),i+=s(d,"iridescenceThicknessMap",n,i),i+=s(d,"specularColorMap",n,i),i+=s(d,"specularIntensityMap",n,i),i+=s(d,"alphaMap",n,i),i+=s(d,"anisotropyMap",n,i);const x=r(d,"multiscatterColor",null);n[i++]=x?x.r:1,n[i++]=x?x.g:1,n[i++]=x?x.b:1,n[i++]=r(d,"scatterStrength",0),n[i++]=r(d,"scatterAnisotropy",0),i+=3}return{materialData:h,textures:l}}writeMaterialData(e,t,a){const{materialsMap:r}=this,{object:s,instanceId:i,root:o}=e;let l=s.material;if(Array.isArray(l)){const{materialIndex:f}=s.geometry.groups[o];l=l[f]}const u=new Uint32Array(a),n=r.has(l)?r.get(l):-1;n===-1&&(u[t*Bt.getLength()+32]=0),u[t*Bt.getLength()+33]=n,s.isInstancedMesh&&s.instanceColor?(s.getColorAt(i,et),et.w=1):s.isBatchedMesh&&s._colorsTexture?s.getColorAt(i,et):et.setScalar(1);const h=new Float32Array(a);et.toArray(h,t*Bt.getLength()+36)}writeTransformData(e,t,a,r){super.writeTransformData(e,t,a,r),this.writeMaterialData(e,a,r);const s=new Uint32Array(r);s[a*this.structs.transform.getLength()+34]=e.object.visibleToShadowRays===!1?0:1}getBVH(e,t,a){const{bvhMap:r}=this,s=super.getBVH(e,t,a);if(r.has(s)){const i=r.get(s);if(Object.assign(a,i.range),s!==i.bvh&&s instanceof lt){const o=s.mesh,l=i.bvh.mesh;l.matrixWorld.copy(o.matrixWorld).decompose(l.position,l.quaternion,l.scale),s.refit(),s.getBoundingBox(l.boundingBox),s.geometry.computeBoundingBox()}return i.bvh}else if(s.indirect){const i=new pn;i.attributes=s.geometry.attributes;let o;if(s.geometry.index)o=s.geometry.index.array.slice(a.start,a.count+a.start);else{const{start:u,count:n}=a;o=new Uint32Array(n);for(let h=0,f=a.count;h<f;h++)o[h]=u+h}i.index=new rt(o,1),a.start=0;let l;if(s instanceof lt){const u=s.mesh,n=new gn(i);n.copy(u),n.matrixWorld.copy(u.matrixWorld).decompose(n.position,n.quaternion,n.scale),l=new lt(n,{strategy:dt,targetLeafSize:5})}else l=new Ot(i,{strategy:dt,targetLeafSize:5});return r.set(s,{bvh:l,range:{...a}}),l}else return s}dispose(){var t;const{storage:e}=this;for(const a in e)(t=e[a].value)==null||t.dispose()}}class rc extends gt{set texture(e){this._texNode.value=e}set layer(e){this._layerUniform.value=e}constructor(){super(),this.blending=Kt,this._texNode=te(new K),this._layerUniform=w(0),this.colorNode=v(`
			fn atlasDebug( tex: texture_2d_array<f32>, coord: vec2f, layer: f32 ) -> vec4f {

				// flip y so texel origin shows at the top-left
				let dims = vec2f( textureDimensions( tex, 0 ).xy );
				let texel = vec2i( vec2f( coord.x, 1.0 - coord.y ) * dims );
				return textureLoad( tex, texel, i32( layer ), 0 );

			}
		`)(this._texNode,xt(Ge()),this._layerUniform)}}class ic extends gt{set texture(e){this._texNode.value=e}set minCount(e){this._minUniform.value=e}set maxCount(e){this._maxUniform.value=e}constructor(){super(),this.blending=Kt,this._texNode=te(new pe(1,1)),this._minUniform=w(0),this._maxUniform=w(1);const e=m`
			fn sampleDensity( tex: texture_2d<u32>, coord: vec2f, minCount: f32, maxCount: f32 ) -> vec4f {

				let dims = vec2f( textureDimensions( tex, 0 ) );
				let texel = vec2i( coord * dims );

				// the high bits hold the ray state flags rather than part of the count
				let samples = textureLoad( tex, texel, 0 ).r & ${ft}u;

				// stretched across the recorded range rather than from zero, otherwise a converged
				// image with counts bunched near the max reads as uniformly hot
				let range = max( maxCount - minCount, 1.0 );
				let t = clamp( ( f32( samples ) - minCount ) / range, 0.0, 1.0 );

				return vec4f( ${Fi}( t ), 1.0 );

			}
		`;this.colorNode=e(this._texNode,xt(Ge()),this._minUniform,this._maxUniform)}}class sc extends gt{set texture(e){this._texNode.value=e}set showNormal(e){this._showNormalUniform.value=e?1:0}constructor(){super(),this.blending=Kt,this._texNode=te(Ue()),this._showNormalUniform=w(0,"uint");const e=m`
			fn auxDebug( tex: texture_2d_array<u32>, coord: vec2f, showNormal: u32 ) -> vec4f {

				// the rows are stored top down, so the quad's bottom up uv is flipped
				let texel = vec2u( vec2f( coord.x, 1.0 - coord.y ) * vec2f( textureDimensions( tex, 0 ) ) );
				var packed: vec3u;
				for ( var layer = 0u; layer < ${oe}u; layer ++ ) {

					packed[ layer ] = textureLoad( tex, texel, layer, 0 ).r;

				}

				let albedo = ${Ea}( packed );
				let normal = ${za}( packed );
				return vec4f( select( albedo, normal, showNormal == 1u ), 1.0 );

			}
		`;this.colorNode=e(this._texNode,xt(Ge()),this._showNormalUniform)}}function nc(c,e){if(!c.index){const t=c.attributes.position.count,a=new Array(t);for(let r=0;r<t;r++)a[r]=r;c.setIndex(a)}if(!c.attributes.normal&&e&&e.includes("normal")&&c.computeVertexNormals(),!c.attributes.uv&&e&&e.includes("uv")){const t=c.attributes.position.count;c.setAttribute("uv",new rt(new Float32Array(t*2),2,!1))}if(!c.attributes.uv2&&e&&e.includes("uv2")){const t=c.attributes.position.count;c.setAttribute("uv2",new rt(new Float32Array(t*2),2,!1))}if(!c.attributes.tangent&&e&&e.includes("tangent"))if(c.attributes.uv&&c.attributes.normal)c.computeTangents();else{const t=c.attributes.position.count;c.setAttribute("tangent",new rt(new Float32Array(t*4),4,!1))}if(!c.attributes.color&&e&&e.includes("color")){const t=c.attributes.position.count,a=new Float32Array(t*4);a.fill(1),c.setAttribute("color",new rt(a,4))}}class oc{init(){}getBsdfNode(){return m`

			fn bsdfSample( worldWo: vec3f, surf: SurfaceRecord ) -> ScatterRecord {

				var record: ScatterRecord;

				let wo = normalize( surf.normalInvBasis * worldWo );
				let wi = ${go}( wo, ${ne}( ${Wi} ) );
				record.color = surf.color * max( wi.z, 0.0 );
				record.pdf = max( wi.z, 0.0 ) / PI;
				record.direction = normalize( surf.normalBasis * wi );

				return record;

			}

		`}getBsdfEvalPdfNode(){return m`

			fn bsdfEvalPdf( worldWo: vec3f, worldWi: vec3f, surf: SurfaceRecord ) -> ScatterRecord {

				var record: ScatterRecord;
				record.direction = worldWi;

				let wo = normalize( surf.normalInvBasis * worldWo );
				let wi = normalize( surf.normalInvBasis * worldWi );
				record.color = surf.color * max( wi.z, 0.0 );
				record.pdf = max( wi.z, 0.0 ) / PI;

				return record;

			}

		`}getData(){return{bsdfSample:this.getBsdfNode(),bsdfEvalPdf:this.getBsdfEvalPdfNode()}}}const lc=v(`

	fn eonDirectionalAlbedo( mu: f32, roughness: f32, A: f32 ) -> f32 {

		let muComp = 1.0 - mu;
		let gOverPi = muComp * (
			0.0571085289 + muComp * (
				0.491881867 + muComp * (
					- 0.332181442 + muComp * 0.0714429953
				)
			)
		);
		return A * ( 1.0 + roughness * gOverPi );

	}

`),Cs=v(`

	fn fonSingleScatter( NdotV: f32, NdotL: f32, VdotH: f32, roughness: f32, A: f32, rho: vec3f ) -> vec3f {

		let VdotL = 2.0 * VdotH * VdotH - 1.0;
		let s = VdotL - NdotV * NdotL;
		let sOverT = select( s, s / max( NdotV, NdotL ), s > 0.0 );

		return ( rho / PI ) * A * ( 1.0 + roughness * sOverT );

	}

`,[M]);v(`

	fn fonBrdf( NdotV: f32, NdotL: f32, VdotH: f32, surf: SurfaceRecord ) -> vec3f {

		let roughness = surf.diffuseRoughness;
		if ( roughness < 1e-5 ) {

			return surf.color / PI;

		}

		let rho = saturate( surf.color );
		let A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );

		return fonSingleScatter( NdotV, NdotL, VdotH, roughness, A, rho );

	}

`,[M,Q,Cs]);const cc=v(`

	fn eonBrdf( NdotV: f32, NdotL: f32, VdotH: f32, surf: SurfaceRecord ) -> vec3f {

		let roughness = surf.diffuseRoughness;
		if ( roughness < 1e-5 ) {

			return surf.color / PI;

		}

		let rho = saturate( surf.color );
		let A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		let singleScatter = fonSingleScatter( NdotV, NdotL, VdotH, roughness, A, rho );

		let averageDirectionalAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		let directionalAlbedoV = eonDirectionalAlbedo( NdotV, roughness, A );
		let directionalAlbedoL = eonDirectionalAlbedo( NdotL, roughness, A );

		let rhoMultiScatter = rho * rho * averageDirectionalAlbedo /
			max( vec3f( 1e-7 ), vec3f( 1.0 ) - rho * ( 1.0 - averageDirectionalAlbedo ) );
		let multiScatter = ( rhoMultiScatter / PI ) *
			max( 1e-7, 1.0 - directionalAlbedoV ) *
			max( 1e-7, 1.0 - directionalAlbedoL ) /
			max( 1e-7, 1.0 - averageDirectionalAlbedo );

		return singleScatter + multiScatter;

	}

`,[M,Q,lc,Cs]),Ds=v(`

	fn eonLtcCoeffs( mu: f32, roughness: f32 ) -> vec4f {

		let a = 1.0 + roughness * (
			0.303392 + ( - 0.518982 + 0.111709 * mu ) * mu +
			( - 0.276266 + 0.335918 * mu ) * roughness
		);
		let b = roughness * (
			- 1.16407 + 1.15859 * mu + ( 0.150815 - 0.150105 * mu ) * roughness
		) / ( mu * mu * mu - 1.43545 );
		let c = 1.0 + roughness * ( 0.20013 + ( - 0.506373 + 0.261777 * mu ) * mu );
		let d = roughness * (
			0.540852 + ( - 1.01625 + 0.475392 * mu ) * mu
		) / ( - 1.0743 + ( 0.0725628 + mu ) * mu );

		return vec4f( a, b, c, d );

	}

`),$s=v(`

	fn eonLtcBasis( wo: vec3f ) -> mat3x3f {

		let lenSqr = dot( wo.xy, wo.xy );
		let invLen = inverseSqrt( lenSqr );
		let x = select(
			vec3f( 1.0, 0.0, 0.0 ),
			vec3f( wo.x, wo.y, 0.0 ) * invLen,
			lenSqr > 0.0,
		);
		let y = vec3f( - x.y, x.x, 0.0 );

		return mat3x3f( x, y, vec3f( 0.0, 0.0, 1.0 ) );

	}

`),uc=v(`

	fn eonCltcPdf( wo: vec3f, wi: vec3f, roughness: f32 ) -> f32 {

		let toLtc = transpose( eonLtcBasis( wo ) );
		let wiLtc = toLtc * wi;
		let coeffs = eonLtcCoeffs( saturate( wo.z ), roughness );
		let a = coeffs.x;
		let b = coeffs.y;
		let c = coeffs.z;
		let d = coeffs.w;
		let detM = c * ( a - b * d );
		let wh = vec3f(
			c * ( wiLtc.x - b * wiLtc.z ),
			( a - b * d ) * wiLtc.y,
			- c * ( d * wiLtc.x - a * wiLtc.z ),
		);
		let lenSqr = max( dot( wh, wh ), 1e-7 );
		let vz = inverseSqrt( d * d + 1.0 );
		let s = 0.5 * ( 1.0 + vz );
		let jacobian = detM * detM / ( lenSqr * lenSqr );

		return jacobian * max( wh.z, 0.0 ) / ( PI * s );

	}

`,[M,Ds,$s]),dc=v(`

	fn eonCltcDirection( wo: vec3f, roughness: f32, uv: vec2f ) -> vec3f {

		let coeffs = eonLtcCoeffs( saturate( wo.z ), roughness );
		let a = coeffs.x;
		let b = coeffs.y;
		let c = coeffs.z;
		let d = coeffs.w;
		let radius = sqrt( uv.x );
		let phi = 2.0 * PI * uv.y;
		let y = radius * sin( phi );
		let vz = inverseSqrt( d * d + 1.0 );
		let s = 0.5 * ( 1.0 + vz );
		let x = - mix( sqrt( max( 1.0 - y * y, 0.0 ) ), radius * cos( phi ), s );
		let wh = vec3f( x, y, sqrt( max( 1.0 - x * x - y * y, 0.0 ) ) );
		let wiUnnormalized = vec3f(
			a * wh.x + b * wh.z,
			c * wh.y,
			d * wh.x + wh.z,
		);
		let wi = normalize( eonLtcBasis( wo ) * wiUnnormalized );

		return wi;

	}

`,[M,Ds,$s]),hc=v(`

	fn eonUniformHemisphereSample( uv: vec2f ) -> vec3f {

		let sinTheta = sqrt( max( 1.0 - uv.x * uv.x, 0.0 ) );
		let phi = 2.0 * PI * uv.y;
		return vec3f( sinTheta * cos( phi ), sinTheta * sin( phi ), uv.x );

	}

`,[M]),Ms=v(`

	fn eonUniformProbability( wo: vec3f, roughness: f32 ) -> f32 {

		let mu = saturate( wo.z );
		return clamp( pow( roughness, 0.1 ), 0.0, 1.0 ) * (
			0.162925 + ( - 0.372058 + ( 0.538233 - 0.290822 * mu ) * mu ) * mu
		);

	}

`),fc=v(`

	fn eonDirection( wo: vec3f, roughness: f32, uv: vec2f ) -> vec3f {

		let uniformProbability = eonUniformProbability( wo, roughness );
		if ( uv.x <= uniformProbability && uniformProbability > 0.0 ) {

			return eonUniformHemisphereSample( vec2f( uv.x / uniformProbability, uv.y ) );

		}

		let cltcProbability = 1.0 - uniformProbability;
		let cltcUv = vec2f(
			( uv.x - uniformProbability ) / max( cltcProbability, 1e-7 ),
			uv.y,
		);
		return eonCltcDirection( wo, roughness, cltcUv );

	}

`,[dc,hc,Ms]),mc=v(`

	fn eonPdf( wo: vec3f, wi: vec3f, roughness: f32 ) -> f32 {

		// The EON proposal is defined over the positive hemisphere.
		if ( wo.z <= 0.0 || wi.z <= 0.0 ) {

			return 0.0;

		}

		let uniformProbability = eonUniformProbability( wo, roughness );
		let cltcProbability = 1.0 - uniformProbability;
		let uniformPdf = 1.0 / ( 2.0 * PI );

		return uniformProbability * uniformPdf +
			cltcProbability * eonCltcPdf( wo, wi, roughness );

	}

`,[M,uc,Ms]),pc=m`

	fn velvetD( cosThetaH: f32, roughness: f32 ) -> f32 {

		var alpha = max( roughness, 0.07 );
		alpha = alpha * alpha;

		let invAlpha = 1.0 / alpha;
		let sqrCosThetaH = cosThetaH * cosThetaH;
		let sinThetaH = max( 1.0 - sqrCosThetaH, 0.001 );

		return ( 2.0 + invAlpha ) * pow( sinThetaH, 0.5 * invAlpha ) / ( 2.0 * PI );

	}

`,tt=m`

	fn velvetParamsInterpolate( i: i32, oneMinusAlphaSquared: f32 ) -> f32 {

		let p0 = array<f32, 5>( 25.3245, 3.32435, 0.16801, - 1.27393, - 4.85967 );
		let p1 = array<f32, 5>( 21.5473, 3.82987, 0.19823, - 1.97760, - 4.32054 );

		return mix( p1[ i ], p0[ i ], oneMinusAlphaSquared );

	}

`,ba=m`

	fn velvetL( x: f32, alpha: f32 ) -> f32 {

		let oneMinusAlpha = 1.0 - alpha;
		let oneMinusAlphaSquared = oneMinusAlpha * oneMinusAlpha;

		let a = ${tt}( 0, oneMinusAlphaSquared );
		let b = ${tt}( 1, oneMinusAlphaSquared );
		let c = ${tt}( 2, oneMinusAlphaSquared );
		let d = ${tt}( 3, oneMinusAlphaSquared );
		let e = ${tt}( 4, oneMinusAlphaSquared );

		return a / ( 1.0 + b * pow( abs( x ), c ) ) + d * x + e;

	}

`,Qr=m`

	fn velvetLambda( cosTheta: f32, alpha: f32 ) -> f32 {

		if ( abs( cosTheta ) < 0.5 ) {

			return exp( ${ba}( cosTheta, alpha ) );

		} else {

			return exp( 2.0 * ${ba}( 0.5, alpha ) - ${ba}( 1.0 - cosTheta, alpha ) );

		}

	}

`,gc=m`

	fn velvetG( cosThetaO: f32, cosThetaI: f32, roughness: f32 ) -> f32 {

		var alpha = max( roughness, 0.07 );
		alpha = alpha * alpha;

		return 1.0 / ( 1.0 + ${Qr}( cosThetaO, alpha ) + ${Qr}( cosThetaI, alpha ) );

	}

`,Kr=m`

	fn directionalAlbedoSheen( cosThetaIn: f32, alpha: f32 ) -> f32 {

		let cosTheta = saturate( cosThetaIn );
		let c = 1.0 - cosTheta;
		let c3 = c * c * c;

		return 0.65584461 * c3 + 1.0 / ( 4.16526551 + exp( -7.97291361 * sqrt( alpha ) + 6.33516894 ) );

	}

`,xc=m`

	fn sheenAlbedoScaling( wo: vec3f, wi: vec3f, surf: ${Q} ) -> f32 {

		var alpha = max( surf.sheenRoughness, 0.07 );
		alpha = alpha * alpha;

		let maxSheenColor = max( max( surf.sheenColor.r, surf.sheenColor.g ), surf.sheenColor.b );

		let eWo = ${Kr}( clamp( wo.z, 0.001, 1.0 ), alpha );
		let eWi = ${Kr}( clamp( wi.z, 0.001, 1.0 ), alpha );

		return min( 1.0 - maxSheenColor * eWo, 1.0 - maxSheenColor * eWi );

	}

`,vc=m`

	fn sheenColor( wo: vec3f, wi: vec3f, wh: vec3f, surf: ${Q} ) -> vec3f {

		let cosThetaO = clamp( wo.z, 0.001, 1.0 );
		let cosThetaI = clamp( wi.z, 0.001, 1.0 );
		let cosThetaH = wh.z;

		let D = ${pc}( cosThetaH, surf.sheenRoughness );
		let G = ${gc}( cosThetaO, cosThetaI, surf.sheenRoughness );

		// See equation (1) in http://www.aconty.com/pdf/s2017_pbs_imageworks_sheen.pdf
		var color = surf.sheenColor;
		color *= D * G / ( 4.0 * abs( cosThetaO * cosThetaI ) );

		return color;

	}

`,At=32,Lt=16;class yc extends Vs{constructor(){super(At,At,31),this.type=G,this.format=ae,this.minFilter=O,this.magFilter=O,this.dielectricLayerCount=10,this.transmissiveLayerCount=10,this.minIoR=1,this.maxIoR=2.5,this.sampleConductorFn=B("_sampleConductorFn",this),this.sampleDielectricFn=B("_sampleDielectricFn",this),this.sampleTransmissiveFn=B("_sampleTransmissiveFn",this)}generate(e){const{dielectricLayerCount:t,transmissiveLayerCount:a,minIoR:r,maxIoR:s}=this,i={outputTarget:Ws(this).toWriteOnly(),globalId:W,eta:w(1),layer:w(0,"uint"),includeFresnel:w(0),includeRefraction:w(0)},o=[At/Lt,At/Lt,1],l=new k(Oo(i.outputTarget)(i),{workgroupSize:[Lt,Lt,1]});i.layer.value=0,i.eta.value=1,i.includeFresnel.value=0,i.includeRefraction.value=0,e.compute(l.kernel,o);for(let g=0;g<t;g++)i.layer.value++,i.eta.value=1/_a.mapLinear(g,0,t-1,r,s),i.includeFresnel.value=1,e.compute(l.kernel,o);i.includeFresnel.value=1,i.includeRefraction.value=1;for(let g=0;g<a;g++){const x=_a.mapLinear(g,0,a-1,r,s);i.layer.value=1+t+g,i.eta.value=1/x,e.compute(l.kernel,o),i.layer.value=1+t+a+g,i.eta.value=x,e.compute(l.kernel,o)}l.dispose();const u=m`
			fn mapLinearClamped( v: f32, a0: f32, a1: f32, b0: f32, b1: f32 ) -> f32 {

				let mapped = saturate( ( v - a0 ) / ( a1 - a0 ) );
				return mix( b0, b1, mapped );

			}
		`,n=Us(this).setName("turquinTexture"),h=Gt(this).setName("turquinSampler"),f=1/(1+t+2*a);this._sampleConductorFn=m`
			fn sampleConductor( cosTheta0: f32, roughness: f32 ) -> f32 {

				let layer = 0.5;
				let uvw = vec3f( cosTheta0, roughness, layer * ${f} );
				return textureSampleLevel( ${n}, ${h}, uvw, 0 ).r;

			}
		`,this._sampleDielectricFn=m`
			fn sampleDielectric( cosTheta0: f32, roughness: f32, ior: f32 ) -> f32 {

				let blockStart = 1.0;
				let layer = ${u}(
					ior,
					f32( ${r} ), f32( ${s} ),
					0.5, f32( ${t} ) - 0.5,
				) + blockStart;

				let uvw = vec3f( cosTheta0, roughness, layer * ${f} );
				return textureSampleLevel( ${n}, ${h}, uvw, 0 ).r;

			}
		`;const p=1+t,d=1+t+a;this._sampleTransmissiveFn=m`
			fn sampleTransmissive( cosTheta0: f32, roughness: f32, ior: f32, entering: bool ) -> f32 {

				let blockStart = select(
					f32( ${d} ),
					f32( ${p} ),
					entering
				);
				let layer = ${u}(
					ior,
					f32( ${r} ), f32( ${s} ),
					0.5, f32( ${a} ) - 0.5,
				) + blockStart;

				let uvw = vec3f( cosTheta0, roughness, layer * ${f} );
				return textureSampleLevel( ${n}, ${h}, uvw, 0 ).r;

			}
		`}}const Xr=ce(1.5),Yr=ce(1e6);class bc extends oc{constructor(e={}){super();const{specularBrdf:t=cs,specularBtdf:a=us,diffuseBrdf:r=cc,fresnelMix:s=Ao,conductorFresnel:i=zo,fresnelCoat:o=Ho,iridescentFresnel:l=ms}=e;this.turquinTexture=new yc,this.specularBrdf=t,this.specularBtdf=a,this.diffuseBrdf=r,this.fresnelMix=s,this.conductorFresnel=i,this.fresnelCoat=o,this.iridescentFresnel=l,this.transmissionFresnel=Eo(l)}init(e){this.turquinTexture.generate(e)}getBsdfNode(){this._bsdfEvalFunc=m`

			// The material is organized as one scoped block per lobe in cascade order - clearcoat,
			// sheen, transmission, specular, diffuse - each accumulating into a shared result and
			// guarding its own hemisphere.
			// TODO: energy only cascades downward through front faces, so the layers are always traversed
			// outside-in and cannot reflect energy back into the glass from below.
			fn bsdfEval( ctx: ${Rr}, surf: ${Q} ) -> vec3f {

				let NdotV = ctx.V.z;
				let NdotL = ctx.L.z;

				// Each lobe contributes into "result" within its own scope, evaluated in cascade.
				// "attenuation" carries the fraction of energy each layer passes through to
				// the layers beneath it. Every lobe guards its own hemisphere.
				var result = vec3f( 0.0 );
				var attenuation = vec3f( 1.0 );

				// clearcoat
				if ( NdotL > 0.0 && surf.clearcoat > 0.0 ) {

					// the clearcoat evaluates in its own frame
					let toClearcoatMat = surf.clearcoatInvBasis * surf.normalBasis;
					let Vc = normalize( toClearcoatMat * ctx.V );
					let Lc = normalize( toClearcoatMat * ctx.L );
					let Hc = normalize( toClearcoatMat * ctx.H );
					let NdotVc = Vc.z;

					let clearcoatAlpha = surf.clearcoatRoughness * surf.clearcoatRoughness;

					// reuse the same pattern for energy conservation used in the dielectric layer
					let clearcoatEnergySS = max( ${this.turquinTexture.sampleConductorFn}( NdotVc, surf.clearcoatRoughness ), 1e-5 );
					let clearcoatBoost = 1.0 + ${le}( 1.5 ) * ( 1.0 - clearcoatEnergySS ) / clearcoatEnergySS;

					let clearcoatSpecular = ${this.specularBrdf}( Vc, Lc, Hc, vec2( clearcoatAlpha ) ) * clearcoatBoost;
					let clearcoatFresnel = ${Ae}( abs( dot( Vc, Hc ) ), ${le}( 1.5 ) );

					// retrieve specular energy reflected by this layer
					let clearcoatFresnelEnergySS = ${this.turquinTexture.sampleDielectricFn}( NdotVc, surf.clearcoatRoughness, 1.5 ) * clearcoatBoost;

					result += surf.clearcoat * clearcoatFresnel * clearcoatSpecular;
					attenuation *= 1.0 - surf.clearcoat * clearcoatFresnelEnergySS;

				}

				// sheen
				if ( NdotL > 0.0 && surf.sheen > 0.0 ) {

					result += attenuation * surf.sheen * ${vc}( ctx.V, ctx.L, ctx.H, surf );
					attenuation *= mix( 1.0, ${xc}( ctx.V, ctx.L, surf ), surf.sheen );

				}

				// transmission
				// handles specular reflection and transmission
				if ( surf.transmission > 0.0 ) {

					let matchedIor = ${ut}( surf.eta );

					// anisotropic roughness along tangent, bitangent
					let alphaB = surf.roughness * surf.roughness;
					let alphaT = mix( alphaB, 1.0, surf.anisotropy * surf.anisotropy );
					let alpha = vec2( alphaT, alphaB );

					// multiscatter compensation
					var glassBoost = 0.0;
					if ( matchedIor ) {

						glassBoost = 1.0;

					} else if ( surf.thinWall ) {

						// thin wall halves are reflection-shaped so each is compensated with the conductor albedo at its own roughness.
						glassBoost = 1.0 / max( ${this.turquinTexture.sampleConductorFn}( NdotV, surf.roughness ), 1e-5 );

					} else {

						// volumetric bsdf is scaled by its total reflected + refracted energy
						glassBoost = 1.0 / max( ${this.turquinTexture.sampleTransmissiveFn}( NdotV, surf.roughness, surf.ior, surf.frontFace ), 1e-5 );

					}

					let fresnelCosine = select( ctx.VdotH, NdotV, surf.thinWall );
					let fresnel = ${this.transmissionFresnel}( fresnelCosine, surf );

					if ( NdotL < 0.0 ) {

						var refraction = vec3f( 0.0 );
						if ( surf.thinWall && ! matchedIor ) {

							// evaluate the flipped reflection, compensated at the remapped roughness
							let wiMirror = vec3f( ctx.L.xy, - ctx.L.z );
							let thinWallAlpha = vec2f( ${fa}( alphaB, surf.ior ) );
							let thinWallEnergySS = max( ${this.turquinTexture.sampleConductorFn}( NdotV, sqrt( thinWallAlpha.x ) ), 1e-5 );
							refraction = fresnel.transmittance * ${this.specularBrdf}( ctx.V, wiMirror, ctx.H, thinWallAlpha ) / thinWallEnergySS;

						} else if ( ! matchedIor ) {

							// The default BTDF contains the plain dielectric Fresnel complement. Replace it
							// with the colored thin-film-aware coefficient shared by sampling and the PDF.
							let dielectricTransmittance = 1.0 - ${vt}( abs( ctx.VdotH ), surf.eta );
							if ( dielectricTransmittance > EPSILON ) {

								refraction = ${this.specularBtdf}( ctx.V, ctx.L, ctx.H, alpha, surf.eta ) *
									fresnel.transmittance / dielectricTransmittance * glassBoost;

							}

						}

						// the refracted half is not attenuated by the layers above. A volume is entered and exited,
						// so each crossing takes the square root of the color, as in Cycles
						let transmissionTint = select( sqrt( surf.color ), surf.color, surf.thinWall );
						result += ( 1.0 - surf.metalness ) * surf.transmission * refraction * transmissionTint;

					} else {

						// the raw single scatter lobe scaled by the glass compensation boost rather
						// than the opaque dielectric boost
						let specular = ${this.specularBrdf}( ctx.V, ctx.L, ctx.H, alpha );
						let dielectricSpecular = specular * glassBoost;

						let reflection = dielectricSpecular * fresnel.reflectance;

						result += attenuation * ( 1.0 - surf.metalness ) * surf.transmission * reflection;

					}

				}

				// specular
				// metallic + dielectric + iridescence
				if ( NdotL > 0.0 ) {

					// anisotropic roughness along tangent, bitangent
					let alphaB = surf.roughness * surf.roughness;
					let alphaT = mix( alphaB, 1.0, surf.anisotropy * surf.anisotropy );
					let alpha = vec2( alphaT, alphaB );

					// Sample the single scatter energy for specular at the given roughness
					let energySS = max( ${this.turquinTexture.sampleConductorFn}( NdotV, surf.roughness ), 1e-5 );
					let specular = ${this.specularBrdf}( ctx.V, ctx.L, ctx.H, alpha );

					// metallic with the multiscatter comp
					let metallicBoost = 1.0 + surf.color * ( 1.0 - energySS ) / energySS;
					let metallicSpecular = specular * metallicBoost;
					var metallicReflectance = ${this.conductorFresnel}( ctx.VdotH, surf.color, vec3f( 1.0 ) );

					// dielectric with the multiscatter comp
					let dielectricBoost = 1.0 + surf.f0 * ( 1.0 - energySS ) / energySS;
					let dielectricSpecular = specular * dielectricBoost;

					// KHR_materials_specular: fold the specular color and intensity into the dielectric f0.
					// Schlick is used on both hit sides, matching Cycles - the opaque specular carries no
					// TIR so the energy removed from the base always matches the energy paid back
					let dielectricF0 = min( surf.f0 * surf.specularColor, vec3f( 1.0 ) );
					let dielectricFr = ${Jt}( ctx.VdotH, dielectricF0, vec3f( 1.0 ) );
					var dielectricReflectance = surf.specularIntensity * dielectricFr;

					// iridescence
					var filmFresnelMax = 0.0;
					if ( surf.iridescence > 0.0 ) {

						// the media on either side of the film - air outside and the volume interior
						// as the base on front faces, swapped on back faces so TIR can take effect
						let outsideIor = select( surf.ior, 1.0, surf.frontFace );
						let filmBaseIor = select( 1.0, surf.ior, surf.frontFace );

						let metallicFilmFresnel = ${this.iridescentFresnel}( ctx.VdotH, surf.color, surf.iridescenceIor, outsideIor, surf.iridescenceThickness );
						metallicReflectance = mix( metallicReflectance, metallicFilmFresnel, surf.iridescence );

						let dielectricFilmFresnel = ${this.iridescentFresnel}( ctx.VdotH, vec3f( ${le}( filmBaseIor ) ), surf.iridescenceIor, outsideIor, surf.iridescenceThickness );
						dielectricReflectance = mix( dielectricReflectance, dielectricFilmFresnel, surf.iridescence );
						filmFresnelMax = max( max( dielectricFilmFresnel.r, dielectricFilmFresnel.g ), dielectricFilmFresnel.b );

					}

					let metallic = metallicSpecular * metallicReflectance;
					let dielectric = dielectricSpecular * dielectricReflectance;

					// The energy the specular interface takes from the layers below, at the lobe's specular color
					// and intensity. The table holds the albedo at the ior's f0, and the Schlick albedo is linear
					// in f0, so the tinted albedo slides from it toward the conductor albedo at f0 = 1
					let iorEnergySS = ${this.turquinTexture.sampleDielectricFn}( NdotV, surf.roughness, surf.ior );
					let tintedEnergySS = iorEnergySS + ( dielectricF0 - surf.f0 ) * ( energySS - iorEnergySS ) / ( 1.0 - surf.f0 );
					let fresnelEnergySS = surf.specularIntensity * tintedEnergySS * dielectricBoost;

					result += attenuation * mix( ( 1.0 - surf.transmission ) * dielectric, metallic, surf.metalness );
					attenuation *= ( 1.0 - surf.metalness ) * mix( 1.0 - fresnelEnergySS, vec3f( 1.0 - filmFresnelMax ), surf.iridescence );

				}

				// diffuse
				if ( NdotL > 0.0 ) {

					// the dielectric base mixes diffuse with transmission - the transmissive half
					// is carried by the glass lobe above
					let diffuseVdotH = sqrt( saturate( 0.5 * ( 1.0 + dot( ctx.V, ctx.L ) ) ) );
					let reflection = ${this.diffuseBrdf}( NdotV, NdotL, diffuseVdotH, surf );
					let diffuse = ( 1.0 - surf.transmission ) * reflection;

					result += attenuation * diffuse;

				}

				return result;

			}

		`;const e=this.getBsdfEvalPdfNode();return m`

			fn bsdfSample( worldWo: vec3f, surf: ${Q} ) -> ${_e} {

				var result: ${_e};
				result.color = vec3f( 0.0 );
				result.isTransmissive = false;
				result.direction = vec3f( 0.0 );
				result.pdf = 0.0;

				let wo = normalize( surf.normalInvBasis * worldWo );
				let woClearcoat = normalize( surf.clearcoatInvBasis * worldWo );

				// TODO: mirror bsdfEval's layer structure - the glass layer should own both its
				// reflection and refraction halves
				// lobe selection weights and cumulative bounds in cascade order:
				// clearcoat, specular, transmission, diffuse
				let weights = ${Mr}( wo, wo, woClearcoat, vec3( 0, 0, 1 ), ${Xr}, surf );
				let cdfClearcoat = weights.clearcoat;
				let cdfSpecular = cdfClearcoat + weights.specular;
				let cdfTransmission = cdfSpecular + weights.transmission;
				let cdfTotal = cdfTransmission + weights.diffuse;

				// random samples for lobes
				let lobeSample = ${$e}( ${so} ) * cdfTotal;
				let directionUV = ${ne}( ${Wi} );

				// output
				var wi: vec3f;
				var wh: vec3f;

				// TODO: see if we can clean up these flags so they're not necessary
				var isTransmissionLobe = false;
				var isDeltaTransmission = false;
				var deltaTransmittance = vec3f( 1.0 );
				var deltaProbability = 1.0;
				var isDead = false;

				if ( lobeSample <= cdfClearcoat ) {

					// clearcoat
					let clearcoatAlpha = surf.clearcoatRoughness * surf.clearcoatRoughness;
					let whCoat = ${it}( woClearcoat, vec2( clearcoatAlpha ), directionUV );
					let wiCoat = - normalize( reflect( woClearcoat, whCoat ) );

					wi = normalize( surf.normalInvBasis * surf.clearcoatBasis * wiCoat );
					wh = normalize( surf.normalInvBasis * surf.clearcoatBasis * whCoat );

					// reflected rays must leave above the geometry surface - flip rays that land
					// below it due to the shading normal. Rays below the shading hemisphere are
					// left as is since their loss is refunded by the energy compensation tables
					let faceNormal = normalize( surf.normalInvBasis * surf.faceNormal );
					let geomDotDir = dot( wi, faceNormal );
					if ( wi.z > 0.0 && geomDotDir < 0.0 ) {

						wi = normalize( wi - 2.0 * geomDotDir * faceNormal );

					}

				} else if ( lobeSample <= cdfSpecular ) {

					// specular
					// anisotropic roughness along tangent, bitangent
					let alphaB = surf.roughness * surf.roughness;
					let alphaT = mix( alphaB, 1.0, surf.anisotropy * surf.anisotropy );
					let alpha = vec2( alphaT, alphaB );

					wh = ${it}( wo, alpha, directionUV );
					wi = - normalize( reflect( wo, wh ) );

					// reflected rays must leave above the geometry surface - flip rays that land
					// below it due to the shading normal. Rays below the shading hemisphere are
					// left as is since their loss is refunded by the energy compensation tables
					let faceNormal = normalize( surf.normalInvBasis * surf.faceNormal );
					let geomDotDir = dot( wi, faceNormal );
					if ( wi.z > 0.0 && geomDotDir < 0.0 ) {

						wi = normalize( wi - 2.0 * geomDotDir * faceNormal );

					}

				} else if ( lobeSample <= cdfTransmission ) {

					// transmission
					isTransmissionLobe = true;

					// anisotropic roughness along tangent, bitangent
					let alphaB = surf.roughness * surf.roughness;
					let alphaT = mix( alphaB, 1.0, surf.anisotropy * surf.anisotropy );
					let alpha = vec2( alphaT, alphaB );

					// sample the half vector first and select reflection or refraction by the
					// facet fresnel, matching Cycles - total internal reflection drives the
					// fresnel to 1 so TIR facets always reflect with a matching pdf
					wh = ${it}( wo, alpha, directionUV );

					let fresnelCosine = select( dot( wo, wh ), wo.z, surf.thinWall );
					let fresnel = ${this.transmissionFresnel}( fresnelCosine, surf );

					let fresnelSample = ( lobeSample - cdfSpecular ) / ( cdfTransmission - cdfSpecular );
					let doReflect = fresnelSample < fresnel.reflectProbability;
					if ( doReflect ) {

						wi = - normalize( reflect( wo, wh ) );

					} else if ( ${ut}( surf.eta ) ) {

						// With no IOR boundary, rough transmission collapses to straight-through
						// delta transmission independent of the sampled microfacet.
						wi = - wo;
						wh = vec3f( 0.0, 0.0, 1.0 );
						isDeltaTransmission = true;
						deltaTransmittance = fresnel.transmittance;
						deltaProbability = 1.0 - fresnel.reflectProbability;

					} else if ( surf.thinWall ) {

						// model the double refraction as a single reflection flipped through the
						// surface at the remapped thin wall roughness
						let thinWallAlpha = vec2f( ${fa}( alphaB, surf.ior ) );
						wh = ${it}( wo, thinWallAlpha, directionUV );
						wi = - normalize( reflect( wo, wh ) );
						wi = vec3f( wi.xy, - wi.z );

					} else {

						wi = refract( - wo, wh, surf.eta );

						// "refract" returns zero on total internal reflection, so reflect instead and let "isDead" drop it
						if ( dot( wi, wi ) == 0.0 ) {

							wi = - normalize( reflect( wo, wh ) );

						}

					}

					// the facet choice must agree with the resulting hemisphere - reflection above,
					// transmission below. Mismatched samples are dropped since their loss is
					// refunded by the energy compensation tables
					isDead = doReflect != ( wi.z > 0.0 );

				} else if ( lobeSample <= cdfTotal ) {

					// diffuse
					// all diffuse BRDF variants share the EON sampling proposal
					wi = ${fc}( wo, surf.diffuseRoughness, directionUV );
					wh = normalize( wi + wo );

					// reflected rays must leave above the geometry surface - flip rays that land
					// below it due to the shading normal. Rays below the shading hemisphere are
					// left as is since their loss is refunded by the energy compensation tables
					let faceNormal = normalize( surf.normalInvBasis * surf.faceNormal );
					let geomDotDir = dot( wi, faceNormal );
					if ( wi.z > 0.0 && geomDotDir < 0.0 ) {

						wi = normalize( wi - 2.0 * geomDotDir * faceNormal );

					}

				}

				let worldWi = normalize( surf.normalBasis * wi );
				if ( isDeltaTransmission ) {

					// Cycles represents a singular event with a large matching BSDF and PDF. Their
					// ratio preserves throughput while forward MIS correctly gives the event full weight.
					let transmissionTint = select( sqrt( surf.color ), surf.color, surf.thinWall );
					result.color = ( 1.0 - surf.metalness ) * surf.transmission * transmissionTint *
						deltaTransmittance * ${Yr};
					result.direction = worldWi;
					result.pdf = weights.transmission * deltaProbability * ${Yr};
					result.isTransmissive = dot( worldWi, surf.faceNormal ) < 0.0;

				} else {

					// evaluate the shared eval / pdf function for the sampled direction so the sample
					// and light-sampling paths can never disagree on color or pdf
					result = ${e}( worldWo, worldWi, surf );

				}

				// mismatched glass facets and reflection lobe samples that land below the
				// hemisphere carry no energy - their loss is refunded by the compensation tables
				let invalid = isDead || ( ! isTransmissionLobe && wi.z <= 0.0 );
				result.color *= select( 1.0, 0.0, invalid );

				return result;

			}

		`}getBsdfEvalPdfNode(){if(this._bsdfEvalPdfNode)return this._bsdfEvalPdfNode;this._bsdfEvalFunc||this.getBsdfNode();const e=this._bsdfEvalFunc;return this._bsdfEvalPdfNode=m`

			fn bsdfEvalPdf( worldWo: vec3f, worldWi: vec3f, surf: ${Q} ) -> ${_e} {

				var result: ${_e};
				result.color = vec3f( 0.0 );
				result.isTransmissive = false;
				result.direction = worldWi;
				result.pdf = 0.0;

				let wo = normalize( surf.normalInvBasis * worldWo );
				let wi = normalize( surf.normalInvBasis * worldWi );
				let woClearcoat = normalize( surf.clearcoatInvBasis * worldWo );

				let isTransmission = wi.z < 0.0;
				if ( isTransmission && ${ut}( surf.eta ) ) {

					// Delta transmission has no finite solid-angle BSDF or PDF. It is handled
					// explicitly by bsdfSample, matching PBRT-v4's eta == 1 path.
					return result;

				}

				// reconstruct the half vector bsdfSample would have used for this direction -
				// reflections use the standard half vector while refractions use the generalized
				// form scaled by the ior ratio, oriented into the upper hemisphere
				var wh: vec3f;
				if ( ! isTransmission ) {

					wh = normalize( wo + wi );

				} else if ( surf.thinWall ) {

					// thin wall transmission is modeled as a reflection flipped through the surface
					wh = normalize( wo + vec3f( wi.xy, - wi.z ) );

				} else {

					wh = normalize( wi + wo * surf.eta );
					wh *= sign( wh.z );

				}

				let weights = ${Mr}( wo, wo, woClearcoat, vec3( 0, 0, 1 ), ${Xr}, surf );

				// TODO: mirror bsdfEval's layer structure - the glass layer should own both its
				// reflection and refraction halves
				// pdf mixture - every lobe that can produce the direction contributes its share,
				// in the same cascade order and with the same terms as bsdfSample

				// clearcoat
				if ( weights.clearcoat > 0.0 ) {

					// the clearcoat lobe evaluates in its own frame
					let toClearcoatMat = surf.clearcoatInvBasis * surf.normalBasis;
					let wiClearcoat = normalize( toClearcoatMat * wi );
					if ( wiClearcoat.z > 0.0 ) {

						let whClearcoat = normalize( toClearcoatMat * wh );
						let clearcoatAlpha = surf.clearcoatRoughness * surf.clearcoatRoughness;
						result.pdf += weights.clearcoat * ${st}( woClearcoat, whClearcoat, vec2( clearcoatAlpha ) );

					}

				}

				// specular
				if ( weights.specular > 0.0 && wi.z > 0.0 ) {

					// anisotropic roughness along tangent, bitangent
					let alphaB = surf.roughness * surf.roughness;
					let alphaT = mix( alphaB, 1.0, surf.anisotropy * surf.anisotropy );
					let alpha = vec2( alphaT, alphaB );

					result.pdf += weights.specular * ${st}( wo, wh, alpha );

				}

				// transmission
				if ( weights.transmission > 0.0 ) {

					// anisotropic roughness along tangent, bitangent
					let alphaB = surf.roughness * surf.roughness;
					let alphaT = mix( alphaB, 1.0, surf.anisotropy * surf.anisotropy );
					let alpha = vec2( alphaT, alphaB );

					// the glass lobe selects reflection or refraction by the facet fresnel so
					// each side carries the corresponding share of the transmission pdf
					let fresnelCosine = select( dot( wo, wh ), wo.z, surf.thinWall );
					let fresnel = ${this.transmissionFresnel}( fresnelCosine, surf );

					if ( wi.z > 0.0 ) {

						result.pdf += weights.transmission * fresnel.reflectProbability * ${st}( wo, wh, alpha );

					} else if ( surf.thinWall ) {

						// the flipped reflection shares the reflection pdf at the remapped roughness
						let thinWallAlpha = vec2f( ${fa}( alphaB, surf.ior ) );
						result.pdf += weights.transmission * ( 1.0 - fresnel.reflectProbability ) * ${st}( wo, wh, thinWallAlpha );

					} else {

						result.pdf += weights.transmission * ( 1.0 - fresnel.reflectProbability ) * ${os}( wo, wi, wh, alpha, surf.eta );

					}

				}

				// diffuse
				if ( weights.diffuse > 0.0 ) {

					result.pdf += weights.diffuse * ${mc}( wo, wi, surf.diffuseRoughness );

				}

				//

				// construct the scatter context
				var ctx: ${Rr};
				ctx.V = wo;
				ctx.L = wi;
				ctx.H = wh;
				ctx.VdotH = saturate( dot( wo, wh ) );

				// evaluate the bsdf for the direction
				result.color = ${e}( ctx, surf ) * abs( wi.z );

				// a direction crossing below the surface enters or leaves the volume
				result.isTransmissive = isTransmission && dot( worldWi, surf.faceNormal ) < 0.0;

				return result;

			}

		`,this._bsdfEvalPdfNode}}const ve=new V,kt=new gi,wc=250,Sc=16,Zr=1.15,Jr=2,Tc=4096,ei={strategy:dt,targetLeafSize:5},Ic=4,wa=0,Sa=1,Et=2;async function _c(c,e,t){const a=u=>typeof SharedArrayBuffer<"u"&&u.buffer instanceof SharedArrayBuffer?u:u.slice(),{position:r}=e.attributes,{index:s}=e,i=r.array,o=s?s.array:null;r.array=a(i),s&&(s.array=a(o));const l=await c.generate(e,t);return r.array=i,s&&(o.set(s.array),s.array=o,s.needsUpdate=!0),l}class ti{constructor(e,t){this.key=t,this.renderer=e,this.texture=null,this.hash=null;const a=new K(new Uint8Array([255,255,255,255]),1,1);a.minFilter=O,a.magFilter=O,this.colorTex=a}dispose(){var e;this.colorTex.dispose(),(e=this.texture)==null||e.dispose()}setFromScene(e){var o,l;const{renderer:t,key:a,colorTex:r}=this;let s=e[a],i="";if(s)s.isColor?(r.image.data[0]=s.r*255,r.image.data[1]=s.g*255,r.image.data[2]=s.b*255,r.image.data[3]=255,s=r,i=r.image.data.join(),r.needsUpdate=i!==this.hash):s.isCubeTexture?(i=null,s=new Zl(t).generate(s)):(i=s.uuid+"_"+s.version,i!==this.hash&&(s=s.clone(),s.minFilter=O,s.magFilter=O));else{const u=t.getClearAlpha();t.getClearColor(kt),r.image.data[0]=kt.r*255,r.image.data[1]=kt.g*255,r.image.data[2]=kt.b*255,r.image.data[3]=u*255,s=r,i=r.image.data.join(),r.needsUpdate=i!==this.hash}if(i===null)return(o=this.texture)==null||o.dispose(),this.texture=s,this.hash=null,!0;{const u=i!==this.hash;return u&&((l=this.texture)==null||l.dispose(),this.texture=s,this.hash=i),u}}}class zc extends vi{get maxBounces(){return this._pathTracer.maxBounces}set maxBounces(e){this._pathTracer.maxBounces=e,this.reset()}get frameBudget(){return this._pathTracer.frameBudget}set frameBudget(e){this._pathTracer.frameBudget=e}get frameTime(){return this._pathTracer.timing.frameTime}get maxTransparentBounces(){return this._pathTracer.maxTransparentBounces}set maxTransparentBounces(e){this._pathTracer.maxTransparentBounces=e,this.reset()}get maxSubsurfaceBounces(){return this._pathTracer.maxSubsurfaceBounces}set maxSubsurfaceBounces(e){this._pathTracer.maxSubsurfaceBounces=e,this.reset()}get maxSamples(){return this._pathTracer.maxSamples}set maxSamples(e){var t;this._pathTracer.maxSamples=e,(t=this._denoiser)==null||t.reset()}get complete(){const e=this.maxSamples,t=this._denoiser;return e>0&&this._lastSampleCounts.min>=e&&(!t||t.complete)}async getSampleCountsAsync(){const e=this._pathTracer,t=this._lastSampleCounts,a=await e.getSampleCountsAsync();t.min=a.min,t.max=a.max,t.avg=a.avg;const r=this.getRenderTime()/1e3;return t.samplesPerSecond=r>0?t.avg/r:0,{...t}}get transmissiveBackground(){return this._transmissiveBackground}set transmissiveBackground(e){this._transmissiveBackground!==e&&(this._transmissiveBackground=e,this._pathTracer.setTransmissiveBackground(e))}get filterGlossyFactor(){return this._filterGlossyFactor}set filterGlossyFactor(e){this._filterGlossyFactor!==e&&(this._filterGlossyFactor=e,this._pathTracer.setFilterGlossy(e))}get multipleImportanceSampling(){return this._multipleImportanceSampling}set multipleImportanceSampling(e){this._multipleImportanceSampling!==e&&this.setMultipleImportanceSampling(e)}get clampDirect(){return this._clampDirect}set clampDirect(e){e=Math.max(0,e),this._clampDirect!==e&&(this._clampDirect=e,this._pathTracer.setClamping(e,this._clampIndirect))}get clampIndirect(){return this._clampIndirect}set clampIndirect(e){e=Math.max(0,e),this._clampIndirect!==e&&(this._clampIndirect=e,this._pathTracer.setClamping(this._clampDirect,e))}get target(){return this._pathTracer.outputTarget??null}get fadeState(){return this._fadeState}get lowResTarget(){return this._lowResTarget}get lowResMode(){return this._pathTracer.lowResMode}get compiling(){return this._pathTracer.compiling}get textureAtlas(){return this._bvhData.textureAtlas}useMegakernel(e){const t=this._pathTracer.maxSamples;this._pathTracer.dispose(),this._pathTracer=e?new Cl(this._renderer):new Gr(this._renderer),this._pathTracer.maxSamples=t,this._timingCount=0,this._pathTracer.setBVHData(this._bvhData),this._pathTracer.setMaterial(this.material),this._pathTracer.setRandom(this.random),this._pathTracer.setMultipleImportanceSampling(this.multipleImportanceSampling),this._pathTracer.setTransmissiveBackground(this._transmissiveBackground),this._pathTracer.setFilterGlossy(this._filterGlossyFactor),this._pathTracer.setClamping(this._clampDirect,this._clampIndirect),this._pathTracer.setAccumulateAux(!!(this._denoiser&&this._denoiser.useAuxiliaryBuffers)),this.setCamera(this.camera),this._pathTracer.setEnvironment(this._environmentCache.texture),this._pathTracer.setBackground(this._backgroundCache.texture),this.updateEnvironment(),this.updateLights()}constructor(e){super(),this._renderer=e,this._timer=new vn,this._environmentCache=new ti(e,"environment"),this._backgroundCache=new ti(e,"background"),this._resetTime=-1,this._fadeState=0,this._lastSampleCounts={min:0,max:0,avg:0,samplesPerSecond:0},this._size=new V,this._blitQuad=new He(new Kn),this._timingCount=0,this._frameTimeTotal=0,this._frameTimeCount=0,this._warnedTimestamps=!1,this._fullFrameBudget=null,this._lowResTarget=new pe(1,1),this._lowResTarget.type=Be,this._lowResTarget.generateMipmaps=!1,this._pathTracer=new Gr(e),this._denoiser=null,this._upscaler=null,this._onDenoiserProgress=t=>this.dispatchEvent({type:"progress",stage:"denoising",progress:t.progress}),this._stage=Et,this._sceneRequest=0,this._pendingBVHs=new WeakMap,this.minSamples=1,this.renderDelay=16,this.fadeDuration=250,this.dynamicLowRes=!0,this.lowResScale=.1,this.adaptiveDynamicRes=!0,this.adaptiveFrameBudget=!0,this.targetFrameTime=16,this.renderScale=1,this.synchronizeRenderSize=!0,this.renderToCanvas=!0,this.asyncCompile=!1,this.generateMissingAttributes=!0,this.commonAttributes=["normal","tangent"],this.stableNoise=!0,this.pause=!1,this.filterGlossyFactor=1,this._clampDirect=0,this._clampIndirect=10,this.multipleImportanceSampling=!0,this.transmissiveBackground=Ya,this.random=cl,this.material=new bc,this._invViewProjectionMatrix=w(new N),this._cameraRayFnHandle=null,this._BVHWorker=null,this._lastCompleteCheck=0,this._wasComplete=!1,this.setMaterial(this.material),this.setRandom(this.random),this.setScene(new yn,new yi)}setMultipleImportanceSampling(e){this._multipleImportanceSampling=e,this._pathTracer.setMultipleImportanceSampling(e),this.reset()}setDenoiser(e){var t,a;(t=this._denoiser)==null||t.reset(),(a=this._denoiser)==null||a.removeEventListener("progress",this._onDenoiserProgress),this._denoiser=e,e&&(e.init(this._renderer),e.addEventListener("progress",this._onDenoiserProgress)),this._pathTracer.setAccumulateAux(!!(e&&e.useAuxiliaryBuffers)),this.reset()}setUpscaler(e){this._upscaler=e,e&&e.init(this._renderer)}setScene(e,t){e.updateMatrixWorld(!0),t.updateMatrixWorld(),e.traverse(r=>{var s;this.generateMissingAttributes&&((s=r.geometry)!=null&&s.isBufferGeometry)&&nc(r.geometry,this.commonAttributes),r.isSkinnedMesh?(r.boundsTree?r.boundsTree.refit():r.boundsTree=new lt(r,{strategy:dt,targetLeafSize:5,indirect:!0}),r.boundingBox===null&&(r.boundingBox=new di),r.boundsTree.getBoundingBox(r.boundingBox)):r.isMesh&&(r.geometry.boundsTree||(r.geometry.boundsTree=new Ot(r.geometry,ei)))});const a=new ac(e);a.update(),a.textureAtlas.setTextures(this._renderer,a.textures),this._bvhData&&(this._bvhData.dispose(),this._bvhData.textureAtlas.dispose()),this.scene=e,this._bvhData=a,this._pathTracer.setBVHData(a),this.setCamera(t),this.updateEnvironment(),this.updateLights()}setBVHWorker(e){this._BVHWorker=e}async setSceneAsync(e,t){var p;const a=this._BVHWorker;if(!a)throw new Error('WebGPUPathTracer: "setBVHWorker" must be called before "setSceneAsync" can be called.');this._sceneRequest++;const r=this._sceneRequest,s=this._pendingBVHs,i=new Set,o=new Set;e.traverse(d=>{if(d.isMesh&&!d.isSkinnedMesh&&!d.geometry.boundsTree){const{geometry:g}=d;if(g.attributes.position.isInterleavedBufferAttribute||g.index&&g.index.isInterleavedBufferAttribute)return;s.has(g)?o.add(s.get(g)):i.add(g)}});const l=Array.from(i),u=d=>(d.index?d.index.count:d.attributes.position.count)/3,n=l.reduce((d,g)=>d+u(g),0);let h=0;const f=[];for(let d=0,g=Math.min(Ic,l.length);d<g;d++)f.push(new a);this._setStage(wa),(p=this._denoiser)==null||p.reset();try{await Promise.all([...o,...f.map(async d=>{for(;l.length>0;){const g=l.shift(),x=u(g);let y=0;const b=S=>{h+=(S-y)*x,y=S,r===this._sceneRequest&&this.dispatchEvent({type:"progress",stage:"building",progress:h/n})},T=_c(d,g,{...ei,onProgress:b});s.set(g,T);try{g.boundsTree=await T,b(1)}finally{s.delete(g)}}})])}finally{f.forEach(d=>d.dispose()),r===this._sceneRequest&&this._setStage(Sa)}r===this._sceneRequest&&this.setScene(e,t)}getMaterial(){return this.material}setMaterial(e){this.material=e,this._pathTracer.setMaterial(e),this.reset()}setRandom(e){this.random=e,this._pathTracer.setRandom(e),this.reset()}setCamera(e){if(this.camera=e,e.getCameraRayFn)this._cameraRayFnHandle=e.getCameraRayFn();else{const t=this._invViewProjectionMatrix;this._cameraRayFnHandle={update:()=>(e.coordinateSystem=Ba,e.updateMatrixWorld(),(e.isOrthographicCamera||e.isPerspectiveCamera)&&e.updateProjectionMatrix(),t.value.multiplyMatrices(e.matrixWorld,e.projectionMatrixInverse),!1),fn:m`
					fn getCameraRay( uv: vec2f, resolution: vec2f, ray: ptr<function, ${R}> ) -> bool {

						let ndc = uv * 2.0 - vec2f( 1.0 );
						*ray = ${Xt}( ndc, ${t} );
						return true;

					}
				`}}this._bvhData.fns.getCameraRay=this._cameraRayFnHandle.fn,this._cameraRayFnHandle.update(),this._pathTracer.rebuild(),this.reset()}updateMaterials(){const{_bvhData:e,_renderer:t}=this;e.updateMaterials(),e.textureAtlas.setTextures(t,e.textures),this.reset()}updateTransforms(){this.scene.updateMatrixWorld(!0),this._bvhData.updateTransforms(),this.reset()}updateCamera(){const{_cameraRayFnHandle:e,_pathTracer:t}=this;e.update()&&t.rebuild(),this.reset()}updateEnvironment(){const{_pathTracer:e,scene:t,_environmentCache:a,_backgroundCache:r}=this;a.setFromScene(t)&&e.setEnvironment(a.texture),r.setFromScene(t)&&e.setBackground(r.texture),e.setEnvironmentParams(t.environmentIntensity,t.environmentRotation),e.setBackgroundParams(t.backgroundIntensity,t.backgroundRotation,t.backgroundBlurriness),this.reset()}updateLights(){const{_pathTracer:e,scene:t}=this,a=tc(t);e.setLights(a),this.reset()}setSize(e,t){(this._size.x!==e||this._size.y!==t)&&(this._size.set(e,t),this.reset())}reset(){var e;this._pathTracer.reset(),(e=this._denoiser)==null||e.reset(),this._resetTime=-1,this._fadeState=0,this._timer.update(),this._lastSampleCounts={min:0,max:0,avg:0,samplesPerSecond:0},this._lastCompleteCheck=0,this._wasComplete=!1,this.stableNoise&&this._pathTracer.resetSeed(),this._fullFrameBudget!==null&&(this.frameBudget=this._fullFrameBudget,this._fullFrameBudget=null)}_setStage(e){this._stage!==e&&(this._stage=e,e===wa?this.dispatchEvent({type:"progress",stage:"building",progress:0}):e===Sa?this.dispatchEvent({type:"progress",stage:"compiling",progress:null}):this._dispatchRenderProgress({min:0,max:0,avg:0,samplesPerSecond:0}))}_measureSamples(){const e=this._lastSampleCounts;this.getSampleCountsAsync().then(t=>{if(e===this._lastSampleCounts&&this._stage===Et){const{maxSamples:a}=this;this._fullFrameBudget===null&&a>0&&t.max>=a&&(this._fullFrameBudget=this.frameBudget),this._dispatchRenderProgress(t)}})}_dispatchRenderProgress(e){const{maxSamples:t}=this,a=t>0?Math.min(e.avg/t,1):null;this.dispatchEvent({type:"progress",stage:"rendering",progress:a,samples:e})}_readTiming(){const{timing:e}=this._pathTracer,{trackTimestamp:t}=this._renderer.backend;if(this.adaptiveFrameBudget&&!t&&!this._warnedTimestamps&&(console.warn('WebGPUPathTracer: "adaptiveFrameBudget" needs timestamp queries. Create the renderer with "trackTimestamp: true" on a device that supports them.'),this._warnedTimestamps=!0),e.count===this._timingCount)return;this._timingCount=e.count;const{frameBudget:a}=e;if(!this.adaptiveFrameBudget||a!==this.frameBudget){this._frameTimeTotal=0,this._frameTimeCount=0;return}if(this._frameTimeTotal+=e.frameTime,this._frameTimeCount++,this._frameTimeCount<Sc)return;const{targetFrameTime:r}=this,s=this._frameTimeTotal/this._frameTimeCount;this._frameTimeTotal=0,this._frameTimeCount=0;const i=s/r;if(i<Zr&&i>1/Zr)return;const o=a*r/s,l=_a.clamp(o,a/Jr,a*Jr);this.frameBudget=Math.max(Math.round(l),Tc)}renderSample(){const e=this._renderer,t=this._size,a=this._blitQuad,r=this._pathTracer,s=this._lowResTarget,i=this._timer,{renderDelay:o,dynamicLowRes:l,synchronizeRenderSize:u,renderScale:n,adaptiveDynamicRes:h,minSamples:f,maxSamples:p}=this;if(i.update(),!this._renderer._initialized)return;this.material.initialized||(this.material.init(e),this.material.initialized=!0);let d=1e3*i.getDelta();const g=this._resetTime===-1;g&&(this._resetTime=0,d=0),this._resetTime+=d;const x=e.getRenderTarget(),y=e.autoClear;if(u){e.getDrawingBufferSize(ve);const Le=Math.floor(n*ve.x),ke=Math.floor(n*ve.y);this.setSize(Le,ke)}let{width:b,height:T}=t;const S=this._resetTime<o||g&&l&&f!==0;if(S){const Le=Math.min(Math.sqrt(r.getPreviewPixelBudget()/(b*T)),1);h&&(this.lowResScale=Le);const ke=Math.min(this.lowResScale,Le);b=Math.max(1,Math.floor(ke*b)),T=Math.max(1,Math.floor(ke*T))}r.getSize(ve),!S&&r.lowResMode&&l&&(s.setSize(ve.x,ve.y),e.copyTextureToTexture(r.outputTarget,s)),(ve.x!==b||ve.y!==T)&&r.setSize(b,T);const C=p>0&&this._lastSampleCounts.min>=p;if(!this.pause&&!C&&this._stage>wa&&(!S||S&&l)&&(r.lowResMode=S,r.asyncCompile=this.asyncCompile,r.update(),this._readTiming(),this._setStage(r.compiling?Sa:Et)),this._stage<Et){this._resetTime=-1;return}const P=this._denoiser,F=this._upscaler,A=!!P&&!P.complete&&!P.running&&p>0;S||(!C&&this._fadeState<1&&f>0?this._measureSamples():!C&&this._resetTime-this._lastCompleteCheck>=wc&&(this._lastCompleteCheck=this._resetTime,this._measureSamples()),this._lastSampleCounts.avg>=f&&(this._fadeState+=d/this.fadeDuration,this._fadeState=Math.min(1,this._fadeState)||1));const X=S&&l?1:this._fadeState;let E=r.outputTarget;P&&!S&&(A&&this._lastSampleCounts.min>=p&&P.update(r.outputTarget,r.auxTarget),E=P.texture??E),this.renderToCanvas&&(F&&!S&&(E=F.upscale(E,this.camera),e.setRenderTarget(x)),e.autoClear=l?!0:X===1,a.material.transition=l?X:1,a.material.opacity=l?1:X,a.material.fromTexture=s,a.material.texture=E,a.render(e)),e.autoClear=y,e.setRenderTarget(x);const Y=this.complete;Y&&!this._wasComplete&&this.dispatchEvent({type:"complete"}),this._wasComplete=Y}renderDebugBounds(e={}){const{displayTLAS:t=!0,displayBLAS:a=!0,stopAtSurface:r=!1,saturationCount:s=64}=e,i=this._renderer,o=this.camera;if(!i._initialized)return;o.updateMatrixWorld(),(this._debugBoundsQuad===void 0||this._debugBoundsData!==this._bvhData)&&this._buildDebugBoundsQuad();const l=this._debugBoundsUniforms;l.cameraToModelMatrix.value.copy(o.matrixWorld),l.inverseProjectionMatrix.value.copy(o.projectionMatrixInverse),l.displayTLAS.value=t?1:0,l.displayBLAS.value=a?1:0,l.stopAtSurface.value=r?1:0,l.saturationCount.value=s;const u=i.getRenderTarget(),n=i.autoClear,h=i.toneMapping;i.setRenderTarget(null),i.autoClear=!0,i.toneMapping=ot,this._debugBoundsQuad.render(i),i.setRenderTarget(u),i.autoClear=n,i.toneMapping=h}_buildDebugBoundsQuad(){const e=this._bvhData,t=Xn(e),a=new gt;a.colorNode=t(xt(Ge())),this._debugBoundsQuad===void 0?this._debugBoundsQuad=new He(a):(this._debugBoundsQuad.material.dispose(),this._debugBoundsQuad.material=a),this._debugBoundsUniforms=t.uniforms,this._debugBoundsData=e}renderTextureAtlas(e=0){const t=this._renderer;this._atlasDebugQuad||(this._atlasDebugQuad=new He(new rc));const a=this._atlasDebugQuad;a.material.texture=this.textureAtlas.texture,a.material.layer=e,t.setRenderTarget(null),a.render(t)}renderSampleDensity(){const e=this._renderer;if(!e._initialized)return;this.getSampleCountsAsync(),this._sampleDensityQuad||(this._sampleDensityQuad=new He(new ic));const t=e.toneMapping;e.toneMapping=ot;const a=this._sampleDensityQuad;a.material.texture=this._pathTracer.sampleCountTarget,a.material.minCount=this._lastSampleCounts.min,a.material.maxCount=this._lastSampleCounts.max,e.setRenderTarget(null),a.render(e),e.toneMapping=t}renderAuxBuffer(e="albedo"){const t=this._renderer,a=this._pathTracer;if(!t._initialized||!a.auxTarget)return;this._auxDebugQuad||(this._auxDebugQuad=new He(new sc));const r=t.toneMapping;t.toneMapping=ot;const s=this._auxDebugQuad;s.material.texture=a.auxTarget,s.material.showNormal=e==="normal",t.setRenderTarget(null),s.render(t),t.toneMapping=r}dispose(){var e,t,a,r,s,i,o,l;this._pathTracer.dispose(),(e=this._denoiser)==null||e.dispose(),(t=this._upscaler)==null||t.dispose(),this._bvhData.dispose(),this._bvhData.textureAtlas.dispose(),this._environmentCache.dispose(),this._backgroundCache.dispose(),this._lowResTarget.dispose(),this._blitQuad.dispose(),this._blitQuad.material.dispose(),(a=this._atlasDebugQuad)==null||a.dispose(),(r=this._atlasDebugQuad)==null||r.material.dispose(),(s=this._sampleDensityQuad)==null||s.dispose(),(i=this._sampleDensityQuad)==null||i.material.dispose(),(o=this._auxDebugQuad)==null||o.dispose(),(l=this._auxDebugQuad)==null||l.material.dispose(),this._debugBoundsQuad!==void 0&&(this._debugBoundsQuad.dispose(),this._debugBoundsQuad.material.dispose())}getRenderTime(){return this._resetTime}}const ai=Math.PI,Rc=Gs(([c])=>{const e=c.x.sub(.5),t=ce(1).sub(c.y),a=e.mul(2*ai),r=t.mul(ai),s=nr(r);return Qs(s.mul(or(a)),or(r),s.mul(nr(a)))});class Hc{constructor(e){this.renderer=e,this._blur=w(0),this._pmremNode=qs(null,Rc(Ge()),this._blur);const t=new js;t.colorNode=this._pmremNode,t.toneMapped=!1,this.quad=new ii(t),this.renderTarget=new pi(1,1,{type:Be,format:ae,depthBuffer:!1})}dispose(){this._pmremNode.value=null,this._pmremNode.dispose(),this.quad.material.dispose(),this.renderTarget.dispose()}async generate(e,t=0,a=null,r=null){const{renderTarget:s,quad:i,renderer:o}=this,l=e.clone();a=a??l.image.width,r=r??l.image.height,s.setSize(a,r),s.texture.colorSpace=l.colorSpace,this._pmremNode.value=l,this._blur.value=t;const u=o.getRenderTarget();o.setRenderTarget(s),i.render(o),o.setRenderTarget(u);const n=await o.readRenderTargetPixelsAsync(s,0,0,a,r),h=new Uint16Array(a*r*4);for(let p=0,d=h.length;p<d;p++)h[p]=se.toHalfFloat(n[p]);const f=new K(h,a,r,ae,G);return f.minFilter=l.minFilter,f.magFilter=l.magFilter,f.wrapS=l.wrapS,f.wrapT=l.wrapT,f.mapping=xi,f.colorSpace=l.colorSpace,f.needsUpdate=!0,this._pmremNode.value=null,l.dispose(),f}}class Cc extends k{constructor(){const e={auxTarget:j(Ue()).toReadOnly(),albedoTarget:j(Wt()).toWriteOnly(),normalTarget:j(Wt()).toWriteOnly(),globalId:W},t=m`
			fn compute( globalId: vec3u ) -> void {

				let dims = textureDimensions( ${e.auxTarget} );
				if ( globalId.x >= dims.x || globalId.y >= dims.y ) {

					return;

				}

				var packed: vec3u;
				for ( var layer = 0u; layer < ${oe}u; layer ++ ) {

					packed[ layer ] = textureLoad( ${e.auxTarget}, globalId.xy, layer ).r;

				}

				textureStore( ${e.albedoTarget}, globalId.xy, vec4f( ${Ea}( packed ), 1.0 ) );
				textureStore( ${e.normalTarget}, globalId.xy, vec4f( ${za}( packed ), 1.0 ) );

			}
		`;super(t(e)),this.defineUniformAccessors(e)}}class Oc extends vi{get texture(){return this._texture}get complete(){return this._complete}get running(){return this._running}constructor(e={}){super();const{initUNetFromURL:t,auxWeightsUrl:a,colorWeightsUrl:r,useAuxiliaryBuffers:s=!0,maxTileSize:i=null,dynamicTile:o=null}=e;if(!t)throw new Error('OIDNDenoiser: "initUNetFromURL" from "oidn-webgpu" must be provided.');this.initUNetFromURL=t,this.auxWeightsUrl=a,this.colorWeightsUrl=r,this.useAuxiliaryBuffers=s,this.maxTileSize=i,this.dynamicTile=o,this.renderer=null,this._texture=null,this._running=!1,this._complete=!1,this._abort=null,this._requestId=0,this._failed=!1,this._unets={aux:null,color:null},this._resultPipeline=null,this._rawTexture=null,this._unpackAuxKernel=new Cc().setWorkgroupSize(8,8,1),this._albedoTarget=Wt("Denoiser Albedo"),this._normalTarget=Wt("Denoiser Normal")}init(e){this.renderer=e}update(e,t=null){if(this._complete||this._running||this._failed)return this._texture;let a=null,r=null;return this.useAuxiliaryBuffers&&t&&(this._unpackAux(t),a=this._albedoTarget,r=this._normalTarget),this.denoise(e,a,r).catch(s=>{this._failed=!0,this.dispatchEvent({type:"error",error:s})}),this._texture}async denoise(e,t=null,a=null){if(this._complete||this._running)return;this._running=!0;const r=!!(t&&a),s=++this._requestId;let i;try{i=await this._initUNet(r)}catch(f){throw this._running=!1,f}if(s!==this._requestId||!this._running)return;const{renderer:o}=this,l=o.backend;o.initTexture(e);const{width:u,height:n}=e,h={color:{data:l.get(e).texture,width:u,height:n},scheduling:"animation-frame",progress:(f,p,d,g,x)=>{this._copyOutputToTexture(f,u,n),this.dispatchEvent({type:"progress",progress:(g+1)/x})},done:f=>{this._running=!1,this._complete=!0,this._abort=null,this._disposeAuxImages()}};r&&(o.initTexture(t),o.initTexture(a),h.albedo={data:l.get(t).texture,width:u,height:n},h.normal={data:l.get(a).texture,width:u,height:n}),this._abort=i.tileExecute(h)}reset(){var e,t,a;(e=this._abort)==null||e.call(this),this._abort=null,(t=this._texture)==null||t.dispose(),this._texture=null,(a=this._rawTexture)==null||a.destroy(),this._rawTexture=null,this._disposeAuxImages(),this._running=!1,this._complete=!1,this._failed=!1}dispose(){var e;this.reset(),this._unpackAuxKernel.dispose();for(const t in this._unets)(e=this._unets[t])==null||e.then(a=>a.dispose()),this._unets[t]=null}_unpackAux(e){const{renderer:t,_unpackAuxKernel:a,_albedoTarget:r,_normalTarget:s}=this,{width:i,height:o}=e.image;r.setSize(i,o),s.setSize(i,o),a.auxTarget=e,a.albedoTarget=r,a.normalTarget=s,t.compute(a.kernel,a.getDispatchSize(i,o))}_disposeAuxImages(){this._albedoTarget.dispose(),this._normalTarget.dispose()}_initUNet(e){const t=e?"aux":"color";return this._unets[t]||(this._unets[t]=(async()=>{const a=this.renderer.backend.device,r=e?this.auxWeightsUrl:this.colorWeightsUrl;if(!r)throw new Error(`OIDNDenoiser: no ${e?"auxWeightsUrl":"colorWeightsUrl"} was provided.`);const s={aux:e,hdr:!0};return this.maxTileSize!==null&&(s.maxTileSize=this.maxTileSize),this.dynamicTile!==null&&(s.dynamicTile=this.dynamicTile),this.initUNetFromURL(r,{device:a},s)})()),this._unets[t]}_copyOutputToTexture(e,t,a){var l,u;const r=this.renderer.backend.device;if(!this._resultPipeline){const n=r.createShaderModule({code:`
					@group( 0 ) @binding( 0 ) var<storage, read> src : array<vec4f>;
					@group( 0 ) @binding( 1 ) var dst : texture_storage_2d<rgba16float, write>;

					@compute @workgroup_size( 8, 8 )
					fn main( @builtin( global_invocation_id ) gid : vec3u ) {

						let dims = textureDimensions( dst );
						if ( gid.x >= dims.x || gid.y >= dims.y ) {

							return;

						}

						textureStore( dst, gid.xy, src[ gid.y * dims.x + gid.x ] );

					}
				`});this._resultPipeline=r.createComputePipeline({layout:"auto",compute:{module:n,entryPoint:"main"}})}(!this._rawTexture||this._rawTexture.width!==t||this._rawTexture.height!==a)&&((l=this._rawTexture)==null||l.destroy(),this._rawTexture=r.createTexture({size:[t,a],format:"rgba16float",usage:GPUTextureUsage.STORAGE_BINDING|GPUTextureUsage.TEXTURE_BINDING}),(u=this._texture)==null||u.dispose(),this._texture=new bn(this._rawTexture),this._texture.image={width:t,height:a});const s=r.createBindGroup({layout:this._resultPipeline.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:e.data}},{binding:1,resource:this._rawTexture.createView()}]}),i=r.createCommandEncoder(),o=i.beginComputePass();o.setPipeline(this._resultPipeline),o.setBindGroup(0,s),o.dispatchWorkgroups(Math.ceil(t/8),Math.ceil(a/8)),o.end(),r.queue.submit([i.finish()])}}const at=new V;class Vc{constructor(e={}){const{Upscaler:t,sharpness:a=1}=e;if(!t)throw new Error('FSRUpscaler: the "Upscaler" class from "@pmndrs/upscaler" must be provided.');this.Upscaler=t,this.sharpness=a,this.renderer=null,this._upscaler=null}init(e){var t;this.renderer=e,(t=this._upscaler)==null||t.dispose(),this._upscaler=new this.Upscaler({renderer:e}),this._upscaler.init()}upscale(e,t){const{renderer:a,_upscaler:r}=this;return a.initTexture(e),a.getDrawingBufferSize(at),(r.displayWidth!==at.x||r.displayHeight!==at.y||r.renderWidth!==e.width||r.renderHeight!==e.height)&&r.configure({displayWidth:at.x,displayHeight:at.y,renderWidth:e.width,renderHeight:e.height,path:"spatial"}),r.settings.sharpness=this.sharpness,r.dispatch({color:e},t),r.outputTexture}dispose(){var e;(e=this._upscaler)==null||e.dispose(),this._upscaler=null}}class Dc extends wn{constructor(){super(),this.isEquirectCamera=!0}}Dc.prototype.getCameraRayFn=function(){const e=w(new N);return{fn:m`
		fn getCameraRay( uv: vec2f, resolution: vec2f, ray: ptr<function, ${R}> ) -> bool {

			// screen uv to spherical direction, matching three.js' equirect orientation
			let theta = ( uv.x - 0.5 ) * 2.0 * ${fe};
			let phi = ( 1.0 - uv.y ) * ${fe};
			let sinPhi = sin( phi );
			let direction = vec3f( sinPhi * cos( theta ), cos( phi ), sinPhi * sin( theta ) );

			// equirect ignores the projection - orient by the camera world matrix and place the origin.
			// there is no projection far plane, so the trace distance is unbounded
			ray.origin = ( ${e} * vec4f( 0.0, 0.0, 0.0, 1.0 ) ).xyz;
			ray.direction = ( ${e} * vec4f( direction, 0.0 ) ).xyz;
			ray.maxDist = 0.0;
			return true;

		}
	`,update:()=>(e.value.copy(this.matrixWorld),!1)}};class $c extends yi{set bokehSize(e){this.fStop=this.getFocalLength()/e}get bokehSize(){return this.getFocalLength()/this.fStop}constructor(...e){super(...e),this.fStop=1.4,this.apertureBlades=0,this.apertureRotation=0,this.focusDistance=25,this.anamorphicRatio=1}copy(e,t){return super.copy(e,t),this.fStop=e.fStop,this.apertureBlades=e.apertureBlades,this.apertureRotation=e.apertureRotation,this.focusDistance=e.focusDistance,this.anamorphicRatio=e.anamorphicRatio,this}}const Mc=m`
	fn sampleCircle( uv: vec2f ) -> vec2f {

		let angle = 2.0 * ${fe} * uv.x;
		let radius = sqrt( uv.y );
		return vec2f( cos( angle ), sin( angle ) ) * radius;

	}
`,Fc=m`
	fn sampleTriangle( a: vec2f, b: vec2f, c: vec2f, rIn: vec2f ) -> vec2f {

		let e1 = a - b;
		let e2 = c - b;

		var r = rIn;
		if ( r.x + r.y > 1.0 ) {

			r = vec2f( 1.0 ) - r;

		}

		return e1 * r.x + e2 * r.y;

	}
`,Pc=m`
	fn sampleRegularPolygon( sidesIn: i32, uvw: vec3f ) -> vec2f {

		let sides = max( sidesIn, 3 );
		let anglePerSegment = 2.0 * ${fe} / f32( sides );
		let segment = floor( f32( sides ) * uvw.x );

		let angle1 = anglePerSegment * segment;
		let angle2 = angle1 + anglePerSegment;
		let a = vec2f( sin( angle1 ), cos( angle1 ) );
		let b = vec2f( 0.0, 0.0 );
		let c = vec2f( sin( angle2 ), cos( angle2 ) );

		return ${Fc}( a, b, c, uvw.yz );

	}
`,Bc=m`
	fn sampleAperture( blades: i32, uvw: vec3f ) -> vec2f {

		if ( blades == 0 ) {

			return ${Mc}( uvw.xy );

		} else {

			return ${Pc}( blades, uvw );

		}

	}
`,Nc=m`
	fn rotateVector( v: vec2f, t: f32 ) -> vec2f {

		let vc = cos( t );
		let vs = sin( t );
		return vec2f( v.x * vc - v.y * vs, v.x * vs + v.y * vc );

	}
`;$c.prototype.getCameraRayFn=function(){const e=w(new N),t=w(new N),a=w(0),r=w(0),s=w(0,"int"),i=w(0),o=w(1);return{fn:m`
		fn getCameraRay( uv: vec2f, resolution: vec2f, ray: ptr<function, ${R}> ) -> bool {

			// base ray
			let ndc = uv * 2.0 - vec2f( 1.0 );
			*ray = ${Xt}( ndc, ${e} );

			// camera state
			let forward = normalize( ( ${t} * vec4f( 0.0, 0.0, - 1.0, 0.0 ) ).xyz );
			let cameraOrigin = ( ${t} * vec4f( 0.0, 0.0, 0.0, 1.0 ) ).xyz;

			// depth of field
			// measure focus distance from the camera origin along the optical axis so the focal
			// surface is a flat plane perpendicular to the camera forward vector rather than a sphere
			let focalPoint = cameraOrigin + ray.direction * ( ${a} / dot( ray.direction, forward ) );
			let nearDistance = dot( ray.origin - cameraOrigin, forward );

			// sample the aperture shape
			let shapeUVW = ${Ua}( ${no} );
			var apertureSample = ${Bc}( ${s}, shapeUVW );
			apertureSample *= ${r} * 0.5 * 1e-3;

			// rotate + squash the sample for anamorphic apertures
			apertureSample =
				${Nc}( apertureSample, ${i} )
				* vec2f( ${o}, 1.0 / ${o} );

			// aim from the aperture through the focal point, starting on the near plane like the base ray
			ray.origin = cameraOrigin + ( ${t} * vec4f( apertureSample, 0.0, 0.0 ) ).xyz;
			ray.direction = normalize( focalPoint - ray.origin );
			ray.origin += ray.direction * ( nearDistance / dot( ray.direction, forward ) );

			return true;

		}
	`,update:()=>(this.coordinateSystem=Ba,this.updateMatrixWorld(),this.updateProjectionMatrix(),e.value.multiplyMatrices(this.matrixWorld,this.projectionMatrixInverse),t.value.copy(this.matrixWorld),a.value=this.focusDistance,r.value=this.bokehSize,s.value=this.apertureBlades,i.value=this.apertureRotation,o.value=this.anamorphicRatio,!1)}};Sn.prototype.getCameraRayFn=function(){const e={fn:null,update:null},t=Ks(0),a=Ht([],"mat4"),r=Ht([],"vec4");return e.fn=m`
		fn getCameraRay( uv: vec2f, resolution: vec2f, ray: ptr<function, ${R}> ) -> bool {

			let pixel = uv * resolution;

			for ( var i = 0u; i < ${t}u; i ++ ) {

				let viewport = ${r}[ i ];
				let viewportMax = viewport.xy + viewport.zw;
				if ( all( pixel >= viewport.xy ) && all( pixel < viewportMax ) ) {

					let cameraUv = ( pixel - viewport.xy ) / viewport.zw;
					let ndc = cameraUv * 2.0 - vec2f( 1.0 );
					*ray = ${Xt}( ndc, ${a}[ i ] );
					return true;

				}

			}

			return false;

		}
	`,e.update=()=>{const{cameras:s}=this,i=t.node.value!==s.length;for(t.node.value=s.length;r.array.length<s.length;)r.array.push(new De),a.array.push(new N);a.array.length=s.length,r.array.length=s.length;for(let o=0;o<s.length;o++){const l=s[o],u=l.viewport;l.coordinateSystem=Ba,l.updateMatrixWorld(),l.updateProjectionMatrix(),a.array[o].multiplyMatrices(l.matrixWorld,l.projectionMatrixInverse),r.array[o].copy(u)}return i},e};export{Hc as BlurredEnvMapGenerator,Vc as FSRUpscaler,Oc as OIDNDenoiser,Ec as RANDOM_BLUE_DITHER,kc as RANDOM_PCG,cl as RANDOM_SOBOL,Kn as RenderToScreenNodeMaterial,ul as SAMPLE_ACTIVE_FLAG,ft as SAMPLE_COUNT_MASK,Za as SAMPLE_DISPATCHED_FLAG,xs as TRANSMISSIVE_BACKGROUND_ENVIRONMENT,Ya as TRANSMISSIVE_BACKGROUND_OVERLAY,vs as TRANSMISSIVE_BACKGROUND_TRANSPARENT,zc as WebGPUPathTracer};
